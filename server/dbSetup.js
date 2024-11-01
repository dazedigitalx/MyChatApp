// // dbSetup.js

// const mongoose = require('mongoose');
// const Message = require('./models/msg'); // Adjust path as per your project structure

// // MongoDB connection string
// const mongoURI = 'mongodb+srv://dazedigital:B4oUgXKbTkH0BkrJ@cluster0.aeijwoz.mongodb.net/your_database_name?retryWrites=true&w=majority';

// // Connect to MongoDB
// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Get the default connection
// const db = mongoose.connection;

// // Bind connection to error event
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Bind connection to open event
// db.once('open', async () => {
//     console.log('MongoDB connected');

//     try {
//         // Ensure indexes on the Message model
//         await Message.createIndexes();
//         console.log('Indexes ensured successfully.');
//     } catch (err) {
//         console.error('Error ensuring indexes:', err);
//     } finally {
//         // Close the connection after ensuring indexes
//         db.close();
//         console.log('MongoDB connection closed.');
//     }
// });