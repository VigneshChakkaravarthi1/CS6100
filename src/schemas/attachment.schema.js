const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticket_id: { type: String, required: true, unique: true },
    file_paths: [{ type: String }],
    comments: [{
      created_at: { type: Date},
      text: String
    }]
  });
  ticketSchema.index({ ticket_id: 1 });

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = {Ticket,ticketSchema};
