require("dotenv").config();
const express = require('express');
const cors = require("cors")

const app = express();

const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.TASK_USER,
    host: process.env.TASK_HOST,
    database: process.env.TASK_DATABASE,
    password: process.env.TASK_PASSWORD,
    dialect: process.env.TASK_DIALECT,
    port: 5432
});


const bodyParser = require('body-parser');
const { revalidatePath } = require('next/cache');
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
        .then(taskData => {
            res.send(taskData.rows);
        })
})

app.post('/updateOrInsert', async (req, res) => {
    const {title, urgency, date} = req.body;
    try{
    pool.query(`INSERT INTO tasks (title, urgency, date) VALUES ($1, $2, $3)
   ON CONFLICT (title) DO UPDATE
   SET urgency = EXCLUDED.urgency,
       date = EXCLUDED.date
       RETURNING *`,
        [title, urgency, date]
    )
        .then(taskData => {
            console.log(taskData);
        })
    } catch {
        res.status(500).send("error inserting or updating data");
    }

    revalidatePath('/')
})

app.post('/deleteTask', async (req, res) => {
    const {title} = req.body;
    try{
    pool.query(`DELETE FROM tasks WHERE title = $1
       RETURNING *`,
        [title]
    )
        .then(taskData => {
            console.log(taskData);
        })
    } catch {
        res.status(500).send("error deleting data");
    }
    revalidatePath('/')

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