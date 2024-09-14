# ReminderMate - Gmail Job Reminder Web Application

This is a web application designed to help students manage job placement emails more efficiently. It extracts specific information such as company names, job deadlines, and interview times from Gmail emails, automatically updates job deadlines in the database, and sends reminder notifications. The app uses technologies like React, Node.js, Express, MongoDB, and the Gmail API.

## Features

- Fetches job-related emails send by training and placement cell from Gmail.
- Parses email subjects to extract company name, last date and time to apply.
- Stores email data in MongoDB, avoiding duplicates.
- Updates deadlines and sends reminders if deadlines are extended.
- Sends reminder emails two hours before deadlines.
- Cron jobs to automatically fetch emails and send reminders.

![image](https://github.com/user-attachments/assets/b59c0f9c-4cb8-40d0-86d2-fa5699e448de)


## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API:** Gmail API
- **Job Scheduling:** node-cron
- **Email Notifications:** nodemailer
