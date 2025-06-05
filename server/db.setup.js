const pool = require("./db.config");

async function setupDatabase() {
  try {
    // Create canvassing_notes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS canvassing_notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        notes TEXT,
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create users table (for future authentication)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Database setup completed successfully!");
  } catch (error) {
    console.error("Error setting up database:", error);
    throw error;
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the setup
setupDatabase().catch(console.error);
