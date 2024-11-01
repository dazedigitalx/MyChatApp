const express = require('express');
const router = express.Router();
const guestChannelController = require('../controllers/---guestChannelController.js');

// GET channels for guest users
router.get('/', guestChannelController.getChannelsForGuest); // This line is likely causing the error

// POST a new channel for guest users
router.post('/', guestChannelController.createChannelForGuest);

// DELETE a channel for guest users
router.delete('/:channelId', guestChannelController.deleteChannelForGuest);

module.exports = router;
