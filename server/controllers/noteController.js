// noteController.js

const pool = require('../database'); // Adjust path as per your project structure

const createNote = async (req, res) => {
  const { userId, content } = req.body;
  try {
    const query = 'INSERT INTO notes (userId, content) VALUES (?, ?)';
    await pool.promise().execute(query, [userId, content]);
    res.status(201).json({ message: 'Note created successfully' });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ message: 'Failed to create note.' });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const [rows] = await pool.promise().query('SELECT * FROM notes');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Failed to fetch notes.' });
  }
};

module.exports = { createNote, getAllNotes };
