const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema({
  filename: String,
  ticket_id: String,
});

module.exports = mongoose.model('Attachment', attachmentSchema);
