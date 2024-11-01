const Message = require('../models/Message'); // Ensure this model exists
const Channel = require('../models/Channel'); // Assuming you have a Channel model

// GET all messages for a channel
const getChannelMessages = async (req, res) => {
    try {
        const { channelId } = req.params; // Channel ID from the request parameters

        // Fetch messages using the correct field names
        const messages = await Message.find({ channel_id: channelId }) // Use channel_id for filtering
            .populate('user_id', 'username'); // Populate user details

        // Format messages to include all required fields
        const formattedMessages = messages.map(({ _id, channel_id, user_id, content, timestamp, __v, fileUrl, thumbnailUrl }) => ({
            _id,
            channel_id,
            user_id,
            content,
            message_id: _id, // Use the message's ID as message_id
            timestamp,
            __v,
            fileUrl: fileUrl || null, // Include file URL, fallback to null if undefined
            thumbnailUrl: thumbnailUrl || null // Include thumbnail URL, fallback to null if undefined
        }));

        res.status(200).json({ success: true, messages: formattedMessages }); // Return a success response with formatted messages
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Error fetching messages', error: error.message });
    }
};

// POST a new message to a channel
const sendMessage = async (req, res) => {
    try {
        const { channelId } = req.params; // Assuming channel ID comes from URL
        const { text } = req.body; // Get text from the request body
        const userId = req.user.id; // Retrieve user ID from the authenticated user

        // Validate the input
        if (!text || !channelId) {
            return res.status(400).json({ success: false, message: 'Text and channel ID are required' });
        }

        // Initialize fileUrl and thumbnailUrl
        let fileUrl = null;
        let thumbnailUrl = null;

        // Define the bucket identifier and path prefix
        const bucketIdentifier = 'jxnzhdehsvkhldxdburisb53ogca'; // Fixed bucket identifier
        const pathPrefix = '/vau7t/'; // Path prefix for the files

        // If a file is uploaded, process it
        if (req.file) {
            const fileName = req.file.originalname; // Get the original file name
            const fileMimetype = req.file.mimetype; // Get the file mimetype

            // Construct the file URL correctly using the specified format
            fileUrl = `https://link.storjshare.io/s/${bucketIdentifier}${pathPrefix}${fileName}`; // Use the correct URL format
            if (fileMimetype.startsWith('image/')) {
                thumbnailUrl = fileUrl; // Use the same URL for the thumbnail
            } else {
                // Generate a different thumbnail URL if the file is not an image
                // Here, you might want to create a thumbnail if applicable
                // thumbnailUrl = await generateThumbnail(fileUrl);
            }
        } else {
            console.warn('No file uploaded.'); // Log a warning if no file was uploaded
        }

        // Create a new message instance
        const newMessage = new Message({
            content: text, // Store the text content
            channel_id: channelId,
            user_id: userId, // Ensure you're using the correct field
            timestamp: Date.now(),
            fileUrl, // Store the file URL
            thumbnailUrl // Store the thumbnail URL
        });

        // Save the new message to the database
        const savedMessage = await newMessage.save();

        // Return the new message in the required format
        res.status(201).json({
            success: true,
            message: {
                _id: savedMessage._id,
                channel_id: savedMessage.channel_id,
                user_id: savedMessage.user_id,
                content: savedMessage.content,
                message_id: savedMessage._id,
                timestamp: savedMessage.timestamp,
                __v: savedMessage.__v,
                fileUrl: savedMessage.fileUrl, // Return file URL
                thumbnailUrl: savedMessage.thumbnailUrl // Return thumbnail URL
            }
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Error sending message', error: error.message });
    }
};

// DELETE a message by ID
const deleteMessage = async (req, res) => {
    try {
        const { channelId, messageId } = req.params;
        const deletedMessage = await Message.findOneAndDelete({ _id: messageId, channel_id: channelId }); // Use channel_id

        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        res.json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ success: false, message: 'Error deleting message', error: error.message });
    }
};

// GET a message by ID
const getMessageById = async (req, res) => {
    try {
        const { channelId, messageId } = req.params;
        const message = await Message.findOne({ _id: messageId, channel_id: channelId }); // Use _id for fetching

        if (!message) {
            return res.status(404).json({ success: false, message: 'Message not found' });
        }

        // Format the response message to match the required structure
        const formattedMessage = {
            _id: message._id,
            channel_id: message.channel_id,
            user_id: message.user_id,
            content: message.content,
            message_id: message._id,
            timestamp: message.timestamp,
            __v: message.__v,
            fileUrl: message.fileUrl || null, // Include file URL, fallback to null if undefined
            thumbnailUrl: message.thumbnailUrl || null // Include thumbnail URL, fallback to null if undefined
        };

        res.json({ success: true, message: formattedMessage });
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({ success: false, message: 'Error fetching message', error: error.message });
    }
};

module.exports = {
    getChannelMessages,
    sendMessage,
    deleteMessage,
    getMessageById,
};
