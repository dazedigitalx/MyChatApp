const mongoose = require('mongoose');

// Define the schema for messages
const MessageSchema = new mongoose.Schema({
    content: { type: String, required: true }, // Text content of the message
    channel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true }, // Reference to the channel
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who sent the message
    timestamp: { type: Date, default: Date.now }, // Timestamp of when the message was created
    fileUrl: { type: String, default: null }, // URL of the uploaded file (if any)
    thumbnailUrl: { type: String, default: null }, // Optional thumbnail URL for images
});

// Create the Message model from the schema
const Message = mongoose.model('Message', MessageSchema);

// Export the Message model
module.exports = Message;
