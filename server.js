const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// importing mySQL2 package
const mysql = require('mysql2');

// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


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

// query to get all candidates in rows
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});


// query to return a single candidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err,row) => {
    if(err) {
        console.log(err);
    }
    console.log(row);
});

// query for a delete operation
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
    if(err) {
        console.log(err);
    }
    console.log(result);
});

// query to create a candidater
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
VALUES (?, ?, ?, ?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
    if(err) {
        console.log(err);
    }
    console.log(result);
});

// Default response for any other request
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});