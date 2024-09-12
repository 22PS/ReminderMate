const Email = require('../models/emailModel');
const { fetchEmails } = require('../services/gmailService');
const { sendGmailReminder } = require('../services/gmailReminder');

exports.getEmails = async (req, res) => {
  try {
    const currentDate = new Date().getDate();
    const currentHour = new Date().getHours();

    const emails = await Email.find();

    const validEmails = emails.filter((email) => {
      return (
        email.numDate > currentDate ||
        (email.numDate === currentDate && email.hours >= currentHour)
      );
    });

    const expiredEmails = emails.filter((email) => {
      return email.numDate <= currentDate && email.hours < currentHour;
    });

    await Email.deleteMany({
      _id: { $in: expiredEmails.map((email) => email._id) },
    });

    res.json(validEmails);
  } catch (error) {
    console.error('Error fetching or deleting emails:', error.message);
    res.status(500).send('Server Error');
  }
};

exports.fetchEmailsFromGmail = async (req, res) => {
  try {
    const emails = await fetchEmails();
    res.status(200).json(emails);
  } catch (error) {
    res.status(500).send('Error fetching emails: ' + error.message);
  }
};

exports.sendReminders = async (req, res) => {
  try {
    const emails = await Email.find({ reminderSent: false });
    let remindersSentCount = 0;
    const now = new Date();

    emails.forEach(async (email) => {
      const deadlineDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        email.date,
        email.hours
      );
      const timeDiff = deadlineDate - now;

      if (timeDiff <= 2 * 60 * 60 * 1000 && timeDiff > 0) {
        await sendGmailReminder(
          'example@gmail.com',
          email.companyName,
          email.deadline
        );

        email.reminderSent = true;
        await email.save();
        remindersSentCount++;
        console.log(`${remindersSentCount} reminders sent.`);
      }
    });
    return { success: true, message: `${remindersSentCount} reminders sent.` };
  } catch (error) {
    console.error(`Error while sending reminders: ${error.message}`);
    return { success: false, message: `Error: ${error.message}` };
  }
};
