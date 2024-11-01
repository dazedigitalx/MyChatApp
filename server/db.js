const mongoose = require('mongoose');
const Channel = require('./models/Channel'); // Adjust path if necessary
const User = require('./models/User');       // Adjust path if necessary
const Message = require('./models/Message'); // Adjust path if necessary

// Hardcoded MongoDB URI
const MONGODB_URI = 'mongodb+srv://dazedigital:B4oUgXKbTkH0BkrJ@cluster0.aeijwoz.mongodb.net/FileChat?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');

        // Log the database and collection names after connection
        console.log(`Using database: ${mongoose.connection.name}`); 
        console.log(`Using collection: ${Channel.collection.name}`); 
        console.log(`Using collection: ${User.collection.name}`);    
        console.log(`Using collection: ${Message.collection.name}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = { connectDB };
