const jwt = require("jsonwebtoken"); // Assuming you're using JWT

const verifyToken = (req, res, next) => {
  // Extract token from headers
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    // Verify token using your authentication service
    const decodedUser = jwt.verify(token, "YOUR_SECRET_KEY"); // Replace with your secret key

    // Attach user information to request
    req.user = decodedUser;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid token errors
    res.status(401).json({ message: "Invalid token" });
  }
};

// Export the middleware function for use in your application
module.exports = verifyToken;
