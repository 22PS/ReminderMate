const express = require('express');
const {
  getEmails,
  fetchEmailsFromGmail,
} = require('../controllers/emailController');
const router = express.Router();

router.get('/', getEmails);
router.get('/fetch-gmail', fetchEmailsFromGmail);

module.exports = router;
