const mysql = require("mysql2/promise");
const fs = require("fs/promises");

const pool = mysql.createPool({
  host: "YOUR_HOST", // Replace with your MySQL host
  user: "YOUR_USER", // Replace with your MySQL username
  password: "YOUR_PASSWORD", // Replace with your MySQL password
  database: "YOUR_DATABASE", // Replace with your MySQL database name
});

// For checking table existence

// ... rest of the code

const tableName = "your_table_name"; // Replace with your actual table name

const createTables = async () => {
  // Check if the table already exists (optional)
  try {
    const tableExists = await fs.access(
      `./data/${tableName}.txt`,
      fs.constants.F_OK
    );
    if (tableExists) {
      console.log(`Table "${tableName}" already exists, skipping creation.`);
      return;
    }
  } catch (error) {
    // Ignore errors if the file doesn't exist
  }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        type ENUM('income', 'expense') NOT NULL,
        category VARCHAR(255) DEFAULT NULL,
        amount DECIMAL(10,2) NOT NULL,
        date DATE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      );
    `);
    // ... Create other tables as needed

    // Create a marker file to indicate successful table creation (optional)
    await fs.writeFile(`./data/${tableName}.txt`, "");
    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

// Call createTables() when appropriate (e.g., in your application's startup script)
createTables();
module.exports = pool;
