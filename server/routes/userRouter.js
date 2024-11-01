// userRouter.js

const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware'); // Ensure the path is correct
const UserController = require('../controllers/userController'); // Import UserController

// Define routes using methods from UserController
router.post('/register', UserController.registerUser); // Route for user registration
router.post('/login', UserController.loginUser); // Route for user login
router.get('/me', authMiddleware, UserController.getMe); // Route to get current user info

// New routes for password reset functionality
router.post('/reset-password', UserController.requestPasswordReset); // Request password reset
router.post('/reset-password/:token', UserController.resetPassword); // Reset password with token

module.exports = router;
