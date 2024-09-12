const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  companyName: String,
  numDate: Number,
  hours: Number,
  reminderSent: { type: Boolean, default: false },
});

const Email = mongoose.model('Email', emailSchema);
module.exports = Email;
