const bcrypt = require("bcryptjs"); // For password hashing
const db = require("./db"); // Replace with your database connection

const SALT_ROUNDS = 10; // Adjust salt rounds as needed

async function createUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Validate username (e.g., check for uniqueness or length requirements)
  // ...

  return db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
    username,
    hashedPassword,
  ]);
}

async function login(username, password) {
  const [results] = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  if (!results.length) {
    return false; // User not found
  }

  const user = results[0];
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch; // Return true if password matches, false otherwise
}

async function getUserById(userId) {
  const [results] = await db.query("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);
  return results.length ? results[0] : null;
}

// ... Implement additional user functionalities as needed (update profile, logout, etc.)

module.exports = {
  createUser,
  login,
  getUserById,
};
