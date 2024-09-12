require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'example@gmail.com',
    pass: process.env.GMAIL_PASS,
  },
});

const sendGmailReminder = (recipientEmail, companyName, deadline) => {
  const mailOptions = {
    from: 'example@gmail.com',
    to: recipientEmail,
    subject: `Reminder: Form Submission for ${companyName}`,
    text: `Don't forget to fill the form for ${companyName} before ${deadline}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(`Error while sending email: ${error}`);
    }
    console.log(`Reminder email sent: ${info.response}`);
  });
};

module.exports = { sendGmailReminder };
