const mongoose = require('mongoose');

const messageGuestSchema = new mongoose.Schema({
  content: String,
  sender: mongoose.Schema.Types.ObjectId,
  channel: mongoose.Schema.Types.ObjectId,
  // Add other fields as necessary
}, {
  timestamps: true
});

const MessageGuest = mongoose.model('MessageGuest', messageGuestSchema);

module.exports = MessageGuest;
