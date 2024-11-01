// database.js

require('dotenv').config();

const mysql = require('mysql2');
const { Promise } = require('bluebird');

// Create a MySQL connection pool with promise support
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    Promise: Promise // Use bluebird promise for MySQL queries
});

console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME);


module.exports = pool.promise();
