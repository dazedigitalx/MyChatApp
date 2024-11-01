const express = require('express');
const {
    getAllMessages,
    createMessage,
    deleteMessage,
    getMessageById,
    getChannels,
    createChannel,
    getChannelMessages,
    getChannelById
} = require('../controllers/chatController');

const router = express.Router();

// Channel routes
router.get('/channels', getChannels);
router.post('/channels', createChannel);
router.get('/channels/:channelId/messages', getChannelMessages);
router.get('/channels/:channelId', getChannelById);

// Message routes
router.get('/messages', getAllMessages);
router.get('/messages/:messageId', getMessageById);
router.post('/messages', createMessage);
router.delete('/messages/:messageId', deleteMessage);

module.exports = router;
