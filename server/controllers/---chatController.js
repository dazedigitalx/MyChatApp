// chatController.js

const pool = require('../database');

// GET /api/channels/:channelId
const getChannelById = async (req, res) => {
    const { channelId } = req.params;
    try {
        const [channels] = await pool.query('SELECT * FROM Channels WHERE id = ?', [channelId]);
        if (channels.length === 0) {
            return res.status(404).json({ error: 'Channel not found' });
        }
        res.json(channels[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch channel' });
    }
};

// GET messages for a specific channel
const getChannelMessages = async (req, res) => {
    const channelId = req.params.channelId;
    try {
        const [rows] = await pool.query('SELECT * FROM Messages WHERE channel_id = ?', [channelId]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch channel messages.' });
    }
};

// GET /api/channels - Fetch channels for a user
const getChannels = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Channels');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch channels.' });
    }
};

// POST /api/channels - Create a new channel
const createChannel = async (req, res) => {
    const { name } = req.body;
    const creator_id = req.user.id;

    if (!name || !creator_id) {
        return res.status(400).json({ message: 'Name and userId are required' });
    }

    try {
        await pool.query('INSERT INTO Channels (name, creator_id) VALUES (?, ?)', [name, creator_id]);
        res.status(201).json({ message: 'Channel created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create channel.' });
    }
};

// POST /api/messages - Create a new message
const createMessage = async (req, res) => {
    const { channelId, content } = req.body;
    const userId = req.user.id;

    if (!channelId || !content) {
        return res.status(400).json({ message: 'Channel ID and content are required' });
    }

    try {
        await pool.query('INSERT INTO Messages (channel_id, user_id, content) VALUES (?, ?, ?)', [channelId, userId, content]);
        res.status(201).json({ message: 'Message created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create message.' });
    }
};

// GET /api/messages - Get all messages
const getAllMessages = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Messages');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages.' });
    }
};

// DELETE /api/messages/:messageId - Delete a message
const deleteMessage = async (req, res) => {
    const { channelId, messageId } = req.params;

    try {
        const result = await pool.query('DELETE FROM Messages WHERE id = ? AND channel_id = ?', [messageId, channelId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Message not found' });
        }
        return res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        return res.status(500).json({ message: 'Error deleting message' });
    }
};


module.exports = {
    getChannelById,
    getChannelMessages,
    getChannels,
    createChannel,
    createMessage,
    getAllMessages,
    deleteMessage,
    getMessageById
};
