const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    anonymousId: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date } // Optional: Add expiration logic if needed
});

// Use the collection name 'channelsAnon' explicitly
module.exports = mongoose.model('ChannelGuest', channelSchema, 'channelsAnon');
