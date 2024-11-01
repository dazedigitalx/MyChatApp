const express = require('express');
const router = express.Router();
const ChannelController = require('../controllers/channelController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Protected routes for authenticated users
router.post('/', authMiddleware, ChannelController.createChannel); // Create a new channel
router.get('/', authMiddleware, ChannelController.getUserChannels); // Get channels for the authenticated user
// Example: channelRouter.js
router.get('/', authMiddleware, ChannelController.getUserChannels); // Ensure this route exists

router.delete('/:channelId', authMiddleware, ChannelController.deleteChannel); // Delete a channel by ID
router.get('/:channelId', authMiddleware, ChannelController.getChannelById); // Get a channel by ID

router.get('/', ChannelController.getAllChannels); // If you want to expose this to everyonew

router.post('/', authMiddleware, (req, res, next) => {
    console.log('POST request to /api/channels');
    next(); // Call the next middleware (your controller)
}, ChannelController.createChannel);


module.exports = router;
