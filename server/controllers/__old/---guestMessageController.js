const MessageGuest = require('../models/MessageGuest'); // Ensure this path is correct

// GET all messages for a channel
exports.getChannelMessages = async (req, res) => {
  try {
    const { channelId } = req.params;
    const messages = await MessageGuest.find({ channel_id: channelId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages', message: error.message });
  }
};

// POST a new message to a channel
exports.sendMessage = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { content, user_id } = req.body;
    const newMessage = new MessageGuest({ channel_id: channelId, content, user_id });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message', message: error.message });
  }
};

// DELETE a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const result = await MessageGuest.findByIdAndDelete(messageId);
    if (result) {
      res.status(200).json({ message: 'Message deleted successfully' });
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting message', message: error.message });
  }
};

// GET a message by ID
exports.getMessageById = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await MessageGuest.findById(messageId);
    if (message) {
      res.status(200).json(message);
    } else {
      res.status(404).json({ error: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching message', message: error.message });
  }
};
