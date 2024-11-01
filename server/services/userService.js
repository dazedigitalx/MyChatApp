// const mysql = require('mysql2');
// require('dotenv').config();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     port: process.env.DB_PORT,
//     connectionLimit: 10
// });

// const loginUser = async (req, res, pool) => {
//   // Validate email and password presence
//   if (!req.body.email || !req.body.password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   const { email, password } = req.body;

//   try {
//     // Retrieve user by email using prepared statement to prevent SQL injection
//     const sql = 'SELECT * FROM users WHERE email = ?';
//     const [rows] = await pool.query(sql, [email]);

//     // Check if user exists
//     if (rows.length === 0) {
//       // Avoid revealing if email exists for security reasons
//       return res.status(401).json({ message: 'Invalid login credentials' });
//     }

//     const user = rows[0];

//     // Use secure password hashing comparison (assuming bcrypt)
//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       return res.status(401).json({ message: 'Invalid login credentials' });
//     }

//     // Login successful, generate JWT token (replace with your implementation)
//     const token = 'YOUR_JWT_TOKEN_GENERATION_LOGIC_HERE'; // Replace with actual token generation

//     return res.status(200).json({ message: 'Login successful', token, user: { id: user.id, email: user.email } });
//   } catch (err) {
//     console.error('Error logging in user:', err);
//     return res.status(500).json({ message: 'Error logging in' });
//   }
// };




// const createUser = (userData, callback) => {
//     pool.query('INSERT INTO users SET ?', userData, (error, results, fields) => {
//         if (error) {
//             console.error("Error executing query:", error);
//             return callback(error);
//         }
//         callback(null, results);
//     });
// };

// const getUsers = (callback) => {
//     pool.query('SELECT * FROM users', (error, results, fields) => {
//         if (error) {
//             console.error("Error executing query:", error);
//             return callback(error);
//         }
//         callback(null, results);
//     });
// };

// const getUserById = (id, callback) => {
//     pool.query('SELECT * FROM users WHERE id = ?', [id], (error, results, fields) => {
//         if (error) {
//             console.error("Error executing query:", error);
//             return callback(error);
//         }
//         callback(null, results[0]);
//     });
// };

// const updateUser = (id, userData, callback) => {
//     pool.query('UPDATE users SET ? WHERE id = ?', [userData, id], (error, results, fields) => {
//         if (error) {
//             console.error("Error executing query:", error);
//             return callback(error);
//         }
//         callback(null, results);
//     });
// };

// const deleteUser = (id, callback) => {
//     pool.query('DELETE FROM users WHERE id = ?', [id], (error, results, fields) => {
//         if (error) {
//             console.error("Error executing query:", error);
//             return callback(error);
//         }
//         callback(null, results);
//     });
// };

// module.exports = {
//     createUser,
//     getUsers,
//     getUserById,
//     updateUser,
//     deleteUser,
//     loginUser,
// };
