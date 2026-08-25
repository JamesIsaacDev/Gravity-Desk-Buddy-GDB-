require("dotenv").config();

const { Pool } = require("pg");
const express = require("express");

const app = express();
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});
pool.query("SELECT NOW()")
    .then(function (result) {
        console.log("Database connected:", result.rows[0]);
    })
    .catch(function (error) {
        console.error("Database connection failed:", error.message);
    });
const port = 3000;
app.get("/health", function (request, response) {
    response.send("GDB backend is healthy");
});
app.post("/focus-sessions", function (request, response) {
    const durationMinutes = request.body.durationMinutes;

    if (!durationMinutes || typeof durationMinutes !== "number" || durationMinutes <= 0) {
        return response.status(400).json({
            error: "Invalid focus duration"
        });
    }

    response.status(201).json({
        message: "Focus session accepted",
        durationMinutes: durationMinutes
    });
});
app.listen(port, () => {
  console.log(`GDB backend is listening at http://localhost:${port}`);
});