const express = require("express");
const pool = require("./db.config");

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

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

app.get("/api", (req, res) => {
  res.json({ message: "Hello from severe!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
