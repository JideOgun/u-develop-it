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

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// Default response for any other request
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});