const express = require('express');
const router = express.Router();
// const messageController = require('../controllers/guestMessageController'); // Check this path
const { authMiddleware } = require('../middlewares/authMiddleware'); // Check this path

router.get('/channels/:channelId/', authMiddleware, messageController.getChannelMessages);
router.post('/channels/:channelId/send', authMiddleware, messageController.sendMessage);
router.delete('/:messageId', messageController.deleteMessage);
router.get('/:messageId', authMiddleware, messageController.getMessageById);

module.exports = router;
