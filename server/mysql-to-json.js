const mysql = require('mysql');
const fs = require('fs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',  // Add your MySQL root password if any
    database: 'filesharingapp'
});

connection.connect();

const tables = ['channels', 'files', 'fileshares', 'messages', 'messages_old', 'new_channels', 'users'];

tables.forEach(table => {
    connection.query(`SELECT * FROM ${table}`, (error, results, fields) => {
        if (error) throw error;
        fs.writeFileSync(`${table}.json`, JSON.stringify(results, null, 2));
        console.log(`${table}.json has been saved.`);
    });
});

connection.end();
