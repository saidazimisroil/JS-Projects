// server.js
const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = 3000;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "teachersapi",
    password: "sirojiddinovich",
    port: 5432,
});

app.get("/students", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM students");
        res.json(rows);
    } catch (error) {
        console.error("Error executing query", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
