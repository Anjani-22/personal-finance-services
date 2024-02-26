const User = require("./models/User"); // Assuming your user model is in models/User.js

async function createUser(username, password) {
  // Validate username (e.g., check for uniqueness)
  // ...

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
  });

  try {
    // Mongoose uses the existing connection established elsewhere in your application
    await newUser.save();

    console.log("User created successfully!");
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

// Example usage:
createUser("johndoe", "securepassword123");
