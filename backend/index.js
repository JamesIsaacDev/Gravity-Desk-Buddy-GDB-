require("dotenv").config();

const { Pool } = require("pg");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
pool.query("SELECT NOW()")
    .then(function (result) {
        console.log("Database connected:", result.rows[0]);
    })
    .catch(function (error) {
        console.error("Database connection failed:", error.message);
    });
const port = process.env.PORT || 3000;
app.get("/health", function (request, response) {
    response.send("GDB backend is healthy");
});

app.post("/signup", function (request, response) {
    const displayName = request.body.displayName;
    const username = request.body.username;
    const email = request.body.email;

    if (!displayName || !username || !email) {
        return response.status(400).json({
            error: "Display name, username, and email are required"
        });
    }

    pool.query(
        `
        INSERT INTO users (display_name, username, email)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [displayName, username, email]
    )
    .then(function (result) {
        response.status(201).json(result.rows[0]);
    })
    .catch(function (error) {
        console.error("Signup failed:", error.message);

        response.status(500).json({
            error: "Failed to create user"
        });
    });
});
app.post("/login", function (request, response) {
    const email = request.body.email;

    if (!email) {
        return response.status(400).json({
            error: "Email is required"
        });
    }

    pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    )
    .then(function (result) {
        if (result.rows.length === 0) {
            return response.status(404).json({
                error: "User not found"
            });
        }

        response.status(200).json(result.rows[0]);
    })
    .catch(function (error) {
        console.error("Login lookup failed:", error.message);

        response.status(500).json({
            error: "Failed to look up user"
        });
    });
});

app.post("/focus-sessions", function (request, response) {
    const durationMinutes = request.body.durationMinutes;

    if (
    !durationMinutes ||
    typeof durationMinutes !== "number" ||
    !Number.isInteger(durationMinutes) ||
    durationMinutes <= 0
) {
    return response.status(400).json({
        error: "Invalid focus duration"
    });
}
    pool.query(
    `
    INSERT INTO focus_sessions (user_id, planned_duration_min)
    VALUES ($1, $2)
    RETURNING *
    `,
    [1, durationMinutes]
)
.then(function (result) {
    response.status(201).json(result.rows[0]);
})
.catch(function (error) {
    console.error("Focus session insert failed:", error.message);
    response.status(500).json({
        error: "Failed to create focus session"
    });
});
});
app.patch("/focus-sessions/:sessionId/complete", function (request, response) {
    const sessionId = request.params.sessionId;
    pool.query(
    `
    UPDATE focus_sessions
    SET completed = true,
        actual_duration_min = planned_duration_min,
        ended_at = NOW()
    WHERE session_id = $1
    RETURNING *
    `,
    [sessionId]
)
.then(function (result) {
    response.status(200).json(result.rows[0]);
})
.catch(function (error) {
    console.error("Focus session completion failed:", error.message);
    response.status(500).json({
        error: "Failed to complete focus session"
    });
});
});
app.listen(port, () => {
  console.log(`GDB backend is listening at http://localhost:${port}`);
});