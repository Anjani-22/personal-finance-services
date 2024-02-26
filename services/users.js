const bcrypt = require("bcryptjs"); // For password hashing
const db = require("./db"); // Replace with your database connection
const jwt = require("jsonwebtoken"); // For token generation

const SALT_ROUNDS = 10; // Adjust salt rounds as needed

async function createUser(username, password) {
  // Validate username (e.g., check for uniqueness or length requirements)
  // ...

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Insert user into database
  const newUser = await db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );

  // Extract user ID from the inserted data
  const userId = newUser.insertId;

  // Generate a JSON Web Token (JWT)
  const token = jwt.sign({ userId }, "YOUR_SECRET_KEY", { expiresIn: "1h" }); // Replace with your secret key and adjust expiration time

  return { user: { id: userId, username }, token }; // Return user data and token
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
  if (!isMatch) {
    return false; // Incorrect password
  }

  // Generate a JWT on successful login
  const token = jwt.sign({ userId: user.id }, "YOUR_SECRET_KEY", {
    expiresIn: "1h",
  });

  return { user: { id: user.id, username }, token }; // Return user data and token
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
