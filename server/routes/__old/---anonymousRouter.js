const express = require('express');
const router = express.Router();

// Define the /channels route
router.get('/channels', (req, res) => {
    // Mock response or fetch channels from database
    const channels = [
        { id: 1, name: 'Channel 1' },
        { id: 2, name: 'Channel 2' }
    ];
    res.json(channels);
});

module.exports = router;
