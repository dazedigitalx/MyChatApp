const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadMiddleware'); // Ensure this middleware is correctly defined

// Example controller functions for file management
const { uploadFile, getFile, deleteFile } = require('../controllers/fileController');

// POST /api/files/upload - Upload a file
router.post('/upload', uploadMiddleware.single('file'), uploadFile);


// GET /api/files/:filename - Get a file by filename
router.get('/:filename', getFile);


// DELETE /api/files/:filename - Delete a file by filename
router.delete('/:filename', deleteFile);

module.exports = router;
