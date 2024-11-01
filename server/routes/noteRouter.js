const express = require('express');
// const authMiddleware = require('../middlewares/authMiddleware');
const { getAllNotes, createNote } = require('../controllers/noteController');

const router = express.Router();

// GET all notes
router.get('/', getAllNotes);

// POST to create a new note
router.post('', createNote);

module.exports = router;
