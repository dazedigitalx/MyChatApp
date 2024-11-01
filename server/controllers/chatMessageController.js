// controllers/chatController.js
const pool = require('../database'); // Adjust the path to your database connection pool

exports.saveMessage = (req, res) => {
  const { username, text, timestamp } = req.body;
  const query = 'INSERT INTO chat_messages (username, text, timestamp) VALUES (?, ?, ?)';

  pool.query(query, [username, text, timestamp], (error, results) => {
    if (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ message: 'Failed to save message.' });
      return;
    }
    res.status(201).json({ id: results.insertId, username, text, timestamp });
  });
};

exports.getMessages = (req, res) => {
  const query = 'SELECT * FROM chat_messages ORDER BY timestamp DESC';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving messages:', error);
      res.status(500).json({ message: 'Failed to retrieve messages.' });
      return;
    }
    res.status(200).json(results);
  });
};
