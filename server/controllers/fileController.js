const pool = require('../database');
const fs = require('fs');
const path = require('path');

// POST /api/files - Upload a file
const uploadFile = async (req, res) => {
    const { originalname, path: filepath, mimetype } = req.file;
    const userId = req.user.id;

    try {
        await pool.query('INSERT INTO Files (user_id, filename, filepath, filetype) VALUES (?, ?, ?, ?)', [userId, originalname, filepath, mimetype]);
        res.status(201).json({ message: 'File uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload file' });
    }
};

// GET /api/files/:fileId - Download a file
const downloadFile = async (req, res) => {
    const fileId = req.params.fileId;

    try {
        const [rows] = await pool.query('SELECT * FROM Files WHERE id = ?', [fileId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }

        const file = rows[0];
        res.download(path.resolve(file.filepath), file.filename);
    } catch (error) {
        res.status(500).json({ message: 'Failed to download file' });
    }
};

// POST /api/files/share - Share a file in a channel
const shareFile = async (req, res) => {
    const { fileId, channelId } = req.body;
    const shared_by = req.user.id;

    try {
        await pool.query('INSERT INTO FileShares (file_id, channel_id, shared_by) VALUES (?, ?, ?)', [fileId, channelId, shared_by]);
        res.status(201).json({ message: 'File shared successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to share file' });
    }
};

// Example controller function for file management
const getFile = async (req, res) => {
    const filename = req.params.filename;
    try {
        // Logic to fetch file data or perform file operations
        res.status(200).json({ message: 'File retrieved successfully', filename });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to retrieve file' });
    }
};


// DELETE /api/files/:filename - Delete a file by filename
const deleteFile = async (req, res) => {
    const filename = req.params.filename;

    try {
        // Example: Fetch file details from database (replace with your own query)
        const [rows] = await pool.query('SELECT * FROM Files WHERE filename = ?', [filename]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'File not found' });
        }

        const file = rows[0];

        // Perform deletion from database (replace with your own delete query)
        await pool.query('DELETE FROM Files WHERE id = ?', [file.id]);

        // Delete file from file system (if stored locally)
        fs.unlinkSync(path.resolve(file.filepath));

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete file' });
    }
};



module.exports = {
    uploadFile,
    downloadFile,
    shareFile,
    getFile,
    deleteFile
};
