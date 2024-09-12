const express = require('express');
const emailRoutes = require('./routes/emailRoutes');
const { dbConnect } = require('./config/config');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const cron = require('node-cron');
const { sendReminders } = require('./controllers/emailController');

const PORT = process.env.PORT || 5000;

dbConnect();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/emails', emailRoutes);

cron.schedule('0 * * * *', () => {
  console.log('Running scheduled reminder job');
  sendReminders();
});

cron.schedule('0 */2 * * *', async () => {
  try {
    console.log('Running scheduled email fetch job...');
    const emails = await fetchEmails();
    console.log(`${emails.length} emails fetched successfully`);
  } catch (error) {
    console.error('Error fetching emails in scheduled job:', error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
