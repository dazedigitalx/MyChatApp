// channelController.js

const Channel = require('../models/Channel');

// GET a channel by ID
exports.getChannelById = async (req, res) => {
    const channelId = req.params.channelId;

    try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found' });
        }
        res.json(channel);
    } catch (error) {
        console.error('Error fetching channel by ID:', error);
        res.status(500).json({ error: 'Error fetching channel' });
    }
};

// DELETE a channel by ID
exports.deleteChannel = async (req, res) => {
    const channelId = req.params.channelId;

    try {
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ error: 'Channel not found' });
        }

        // Check if the authenticated user is the creator of the channel
        if (channel.creator_id.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized: You are not the creator of this channel' });
        }

        await Channel.findByIdAndDelete(channelId);
        res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (error) {
        console.error('Error deleting channel:', error);
        res.status(500).json({ error: 'Error deleting channel' });
    }
};

// GET channels created by the authenticated user
exports.getUserChannels = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const creator_id = req.user.id;
        const channels = await Channel.find({ creator_id });
        res.status(200).json(channels);
    } catch (error) {
        console.error('Error fetching user channels:', error);
        res.status(500).json({ error: 'Error fetching user channels' });
    }
};

// POST a new channel
exports.createChannel = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const { id: creator_id } = req.user;
        const { name, description } = req.body;

        const newChannel = new Channel({ name, description, creator_id });
        await newChannel.save();

        res.status(201).json(newChannel);
    } catch (error) {
        if (error.code === 11000) {
            console.error('Duplicate key error:', error);
            return res.status(409).json({ error: 'Channel with this name already exists.' });
        }
        console.error('Error creating channel:', error);
        res.status(500).json({ error: 'Error creating channel' });
    }
};

// GET all channels (optional method to implement)
exports.getAllChannels = async (req, res) => {
    try {
        const channels = await Channel.find();
        res.status(200).json(channels);
    } catch (error) {
        console.error('Error fetching channels:', error);
        res.status(500).json({ error: 'Error fetching channels' });
    }
};
