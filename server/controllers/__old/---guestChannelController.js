const ChannelGuest = require('../models/---ChannelGuest');

exports.getChannelsForGuest = async (req, res) => {
    const { guestId } = req.query;

    if (!guestId) {
        return res.status(400).json({ error: 'Guest ID is required' });
    }

    try {
        const channels = await ChannelGuest.find({ guestId });
        res.status(200).json(channels);
    } catch (error) {
        console.error('Error fetching channels for anonymous users:', error);
        res.status(500).json({ error: 'Error fetching channels' });
    }
};

// Make sure to have the other exported functions as well
exports.createChannelForGuest = async (req, res) => {
    const { name, description, guestId } = req.body;

    if (!name || !description || !guestId) {
        return res.status(400).json({ error: 'Name, description, and guest ID are required' });
    }

    try {
        const newChannel = new ChannelGuest({ name, description, guestId });
        await newChannel.save();
        res.status(201).json(newChannel);
    } catch (error) {
        console.error('Error creating channel for anonymous users:', error.message);
        res.status(500).json({ error: 'Error creating channel', details: error.message });
    }
};

exports.deleteChannelForGuest = async (req, res) => {
    const { guestId } = req.query;
    const { channelId } = req.params;

    if (!guestId || !channelId) {
        return res.status(400).json({ error: 'Guest ID and channel ID are required' });
    }

    try {
        const channel = await ChannelGuest.findOne({ _id: channelId, guestId });
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found or does not belong to the guest' });
        }

        await ChannelGuest.deleteOne({ _id: channelId });
        res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
        console.error('Error deleting channel for guest user:', error);
        res.status(500).json({ error: 'Error deleting channel' });
    }
};
