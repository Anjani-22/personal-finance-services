const mongoose = require("mongoose");

const dbUri = `mongodb://your_username:your_password@your_database_host/your_database_name`; // Replace with your connection URI

mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
