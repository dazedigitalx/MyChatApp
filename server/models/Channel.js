// // models/Channels.js


const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    creator_id: { type: String, required: true }, // Assuming creator_id is a string, adjust if necessary
    description: { type: String, required: false },
    created_at: { type: Date, default: Date.now }
});

// const Channel = mongoose.model('Channel', channelSchema);
const Channel = mongoose.model('Channel', channelSchema);


module.exports = Channel;


