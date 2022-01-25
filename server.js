const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// importing input check function that was provided as started code that validates the user data before the chnages are inserted  into the database
const inputCheck = require('./utils/inputCheck');

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

// query to get all candidates in rows wrapped in a GET route
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON  candidates.party_id = parties.id`;
db.query(sql, (err, rows) => {
    if(err) {
        res.status(500).json({ error: err.message});
        return;
    }
    res.json({
        message: 'success',
        data: rows
    });
});

});



// query to return a single candidate wrapped in a GET route
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name
    AS party_name
    FROM candidates
    LEFT JOIN parties
    ON candidates.party_id = parties.id
    WHERE candidates.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});


// query for a delete operation wrapped in a http request method DELETE route
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.statusMessage(400).json({ error: res.message});
        } else if (!result.affectedRows) {
            res.json({
                message: 'Candidate not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});


// query to create a candidate
app.post('/api/candidate', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    
    if(errors) {
        res.status(400).json({error: errors});
        return;
    }

    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
    VALUES (?, ?, ?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});




// Default response for any other request
app.use((req, res) => {
    res.status(404).end();
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});