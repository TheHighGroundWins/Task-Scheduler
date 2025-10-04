const express = require('express');
const cors = require("cors")

const app = express();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'tasksbackend',
    password: 'postgres',
    dialect: 'postgres',
    port: 5432
});


const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000',
}))


pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})

app.get('/getTasks', (req, res, next) => {
    pool.query('Select * from tasks')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})
app.post('/insertTask', async (req, res) => {
    const {title, urgency, date} = req.body;
    try {
        const result = await pool.query("Insert INTO tasks (title, urgency, date) VALUES($1,$2,$3) RETURNING *",
        [title, urgency, date]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting data");
    }
})

// Require the Routes API  
// Create a Server and run it on the port 3000
const server = app.listen(3001, function () {
    // Starting the Server at the port 3001
    const addr = server.address();

    if (addr) {
        const host = addr.address;
        const port = addr.port;
        console.log(`Server running at http://${host}:${port}`);
    } else {
        console.log("Server address not available");
    }
})