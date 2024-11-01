const express = require('express');
const router = express.Router();
const guestChannelController = require('../controllers/guestChannelController');

// Routes for anonymous users
router.get('/', guestChannelController.getChannelsForAnonymous);
router.post('/', guestChannelController.createChannelForAnonymous);
router.delete('/:channelId', guestChannelController.deleteChannelForAnonymous);

module.exports = router;
