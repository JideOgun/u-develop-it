// importing mySQL2 package
const mysql = require('mysql2');

// connecting to mySQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your mySQL password
        password: 'Dickens3114',
        database: 'election'
    },
    console.log('Connected to the election database.')
);

module.exports = db;