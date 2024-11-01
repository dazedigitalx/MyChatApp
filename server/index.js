require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { connectDB } = require('./db');
const channelRouter = require('./routes/channelRouter');
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const authRouter = require('./routes/authRouter.js'); // Import the auth router

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL_PRODUCTION;

// const CLIENT_URL = process.env.CLIENT_URL_PRODUCTION || 'https://file-chat-client.vercel.app';

const app = express();

// Middleware setup
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    process.env.CLIENT_URL_PRODUCTION,
    'https://file-chat-client.vercel.app',
    'https://file-chat-server.vercel.app',
    'http://localhost:3001',
    'http://localhost:3000',
    'http://localhost:3039',
    process.env.REACT_APP_API_URL


  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

// Log incoming requests without undefined 'token'
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  console.log('Secret:', process.env.JWT_SECRET);
  next(); // Call the next middleware
});

// MongoDB connection
(async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
})();

// API Routes
app.use('/api/users', userRouter);
app.use('/api/channel', channelRouter);
app.use('/api/message', messageRouter);
app.use('/api/auth', authRouter); // Use the auth router

// Handle 404 Not Found
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: `Route ${req.originalUrl} does not exist` });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack || err);
  if (!res.headersSent) {
    res.status(err.status || 500).json({ error: 'Internal Server Error', message: err.message || 'Something went wrong' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Allowed client URL is ${CLIENT_URL}`);
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Server is running!');
});
