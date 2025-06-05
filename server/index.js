const express = require("express");
const pool = require("./db.config");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Test GET endpoint
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Test database connection
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ message: "Database connection successful!", data: rows[0] });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Get all canvassing notes
app.get("/api/canvassing", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM canvassing_notes ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Create a new canvassing note
app.post("/api/canvassing", async (req, res) => {
  const { name, notes, email } = req.body;

  if (!name || !notes) {
    return res.status(400).json({ error: "Name and notes are required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO canvassing_notes (name, notes, email) VALUES (?, ?, ?)",
      [name, notes, email || null]
    );
    res.status(201).json({ id: result.insertId, name, notes, email });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
