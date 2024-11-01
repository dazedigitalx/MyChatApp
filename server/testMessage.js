// testMessage.js
const mongoose = require('mongoose');
const Message = require('./models/Message'); // Ensure the path is correct
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const createTestMessage = async () => {
    const newMessage = new Message({
        message_id: 1, // or use generateUniqueMessageId() if needed
        channel_id: 1,
        user_id: 1,
        content: 'This is a test message',
        created_at: new Date()
    });
    await newMessage.save();
    console.log('Test message created');
};

// Call the function
createTestMessage()
    .catch(console.error)
    .finally(() => mongoose.connection.close()); // Close the connection after execution
