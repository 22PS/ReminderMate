const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { parseEmail } = require('../utils/emailParser');
const Email = require('../models/emailModel');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

function authenticateGmailUser() {
  return new Promise((resolve, reject) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        getNewToken(oAuth2Client, resolve);
      } else {
        oAuth2Client.setCredentials(JSON.parse(token));
        resolve(oAuth2Client);
      }
    });
  });
}

function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });

  console.log('Authorize this app by visiting this url:', authUrl);

  return new Promise((resolve, reject) => {
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          console.error('Error retrieving access token', err);
          return reject(err);
        }

        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        oAuth2Client.setCredentials(token);
        resolve(oAuth2Client);
      });
    });
  });
}

async function fetchEmails() {
  const auth = await authenticateGmailUser();
  const gmail = google.gmail({ version: 'v1', auth });

  let emails = [];
  const response = await gmail.users.messages.list({
    userId: 'me',
    q: 'from:tnpmember1@gmail.com OR from:tnpmember2@gmail.com OR from:tnpmember3@gmail.com',
    maxResults: 20,
  });
  const messages = response.data.messages || [];

  const nowDate = new Date();
  const currDate = nowDate.getDate();
  const currHours = nowDate.getHours();

  for (const message of messages) {
    const msg = await gmail.users.messages.get({
      userId: 'me',
      id: message.id,
      format: 'full',
    });

    const headers = msg.data.payload.headers || [];
    const subjectHeader = headers.find((header) => header.name === 'Subject');
    const subject = subjectHeader ? subjectHeader.value : 'No Subject';

    const { companyName, time, date, isRelevant } = parseEmail(subject);

    if (isRelevant && companyName && time !== 'NA' && date !== 'NA') {
      const hours =
        time.split(' ')[1] === 'AM'
          ? Number(time.split(' ')[0])
          : Number(time.split(' ')[0]) + 12;
      const numDate = Number(date);

      if (numDate > currDate || (numDate === currDate && hours > currHours)) {
        const existingEmail = await Email.findOne({ companyName });

        if (existingEmail) {
          const existingDate = existingEmail.date;
          const existingHours = existingEmail.hours;

          if (
            numDate > existingDate ||
            (numDate === existingDate && hours > existingHours)
          ) {
            existingEmail.date = numDate;
            existingEmail.hours = hours;
            await existingEmail.save();
            console.log(
              `Updated deadline for ${companyName} to ${date} at ${time}`
            );
          }
        } else {
          const newEmail = new Email({ companyName, numDate, hours });
          await newEmail.save();
          console.log(`Saved new email for ${companyName}`);
        }
        emails.push({ companyName, numDate, hours });
      }
    }
  }
  return emails;
}

module.exports = { fetchEmails };
