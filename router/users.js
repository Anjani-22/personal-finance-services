const express = require("express");
const userService = require("../services/users.service");
const jwt = require("jsonwebtoken"); // For authentication (if using JWT)

const router = express.Router();

// User signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    await userService.createUser(username, password);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.login(username, password);
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
    } else {
      // Generate JWT token (replace with your preferred authentication strategy)
      const token = jwt.sign({ userId: user.id }, "your-secret-key", {
        expiresIn: "1h",
      });
      res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User profile (protected route example)
router.get("/profile", async (req, res) => {
  try {
    // Verify authentication (replace with your authentication logic)
    // Example using JWT:
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your-secret-key");
    const userId = decoded.userId;

    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// ... Implement additional user routes as needed (logout, update profile, etc.)

module.exports = router;
