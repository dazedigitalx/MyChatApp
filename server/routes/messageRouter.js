const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Use environment variables for sensitive information
const STORJ_ACCESS_KEY = process.env.STORJ_ACCESS_KEY; 
const STORJ_SECRET_KEY = process.env.STORJ_SECRET_KEY; 
const STORJ_BUCKET_NAME = process.env.STORJ_BUCKET_NAME; 
const STORJ_ENDPOINT = process.env.STORJ_ENDPOINT || 'https://gateway.storjshare.io'; // Use env variable for endpoint

// Configure the Storj S3-compatible client
const s3Client = new S3Client({
    region: 'us-east-1', 
    endpoint: STORJ_ENDPOINT,
    credentials: {
        accessKeyId: STORJ_ACCESS_KEY,
        secretAccessKey: STORJ_SECRET_KEY,
    },
    forcePathStyle: true, // Required for Storj
});

// Set up Multer storage to use in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit file size to 5 MB
    }
});

// GET all messages for a channel
router.get('/channel/:channelId/messages', authMiddleware, messageController.getChannelMessages);

// POST a new message to a channel with optional file upload to Storj
router.post('/channel/:channelId/send', authMiddleware, upload.single('file'), async (req, res) => {
    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    let fileUrl = null; // Initialize fileUrl
    let thumbnailUrl = null; // Initialize thumbnailUrl

    try {
        // Handle file upload if a file is provided
        if (req.file) {
            // Use the original file name for the key
            const originalFileName = encodeURIComponent(req.file.originalname); // Encode file name
            const fileKey = originalFileName; // Use the original file name as the key
            
            const uploadParams = {
                Bucket: STORJ_BUCKET_NAME,
                Key: fileKey,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            };

            // Upload the file to Storj
            const uploadCommand = new PutObjectCommand(uploadParams);
            await s3Client.send(uploadCommand);

            // Construct the file URL correctly using the specified format
            fileUrl = `https://link.storjshare.io/s/jxnzhdehsvkhldxdburisb53ogca/vau7t/${originalFileName}`;  
            console.log('File URL:', fileUrl); // Debug log for URL verification

            // Handle thumbnail URL if it's an image
            if (req.file.mimetype.startsWith('image/')) {
                thumbnailUrl = fileUrl; // Use the same URL for the thumbnail
                console.log('Thumbnail URL:', thumbnailUrl); // Debug log for thumbnail URL
            }
        }

        // Prepare message data
        const messageData = {
            content: req.body.text, // Changed 'text' to 'content' to match the structure
            channelId: req.params.channelId,
            fileUrl, // Should now be correctly set
            thumbnailUrl // Should now be correctly set
        };

        // Send message using message controller
        const result = await messageController.sendMessage(req, res, messageData);

        // Check the result and respond appropriately
        if (result) {
            return res.status(201).json({ success: true, message: 'Message sent successfully', data: result });
        } else {
            // If the controller does not return a result, respond with an error
            if (!res.headersSent) {
                return res.status(400).json({ success: false, message: 'Failed to send message' });
            }
        }
    } catch (error) {
        console.error('Error sending message:', error);
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
        }
    }
});



// DELETE a message by ID
router.delete('/channel/:channelId/message/:messageId', authMiddleware, messageController.deleteMessage);

// GET a message by ID
router.get('/channel/:channelId/message/:messageId', authMiddleware, messageController.getMessageById);

module.exports = router;
