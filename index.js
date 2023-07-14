const express = require('express');
const mysql = require('mysql');
const path = require("path")
// Create connection to the MySQL database
const db = mysql.createConnection({
  host: '159.89.172.182',
  user: 'readonly',
  password: 'read@123Only',
  database: 'vendcom'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Create an Express app
const app = express();

app.use(express.static(path.join(__dirname, 'frontend')))
// Create a route to fetch data from the database
app.get('/machines-data', (req, res) => {
  const sql = 'SELECT * FROM MachineData';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});
// Create a route to fetch data from the database
app.get('/machines', (req, res) => {
    const sql = ` SELECT Machines.*, MachineData.*
    FROM MachineData
    JOIN Machines ON MachineData.machineId = Machines.id where data1 = "Mumbai"` ;
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  });
// Start the server
app.listen(4000, () => {
  console.log('Server started on port 4000');
});
