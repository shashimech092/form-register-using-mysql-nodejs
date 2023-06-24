
// npm install express mysql body-parser
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(express.static(__dirname));
const port = 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection setup
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root@123',
  database: 'dev'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route for handling form submissions
app.post('/register', (req, res) => {
  const { id, name, email, password } = req.body;

  // Perform database operations, e.g., insert new user
  const newUser = { id, name, email, password };
  db.query('INSERT INTO tbl_form_submit SET ?', newUser, (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.sendStatus(500);
      return;
    }

    console.log('User registered successfully');
    res.sendStatus(200);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


