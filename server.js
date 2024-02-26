const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Consider using CORS if needed

const verifyToken = require("verifyToken");
const db = require("./db"); // Replace with your actual database connection
const usersRouter = require("./routers/users"); // (Optional)
const assetsRouter = require("./routers/assets");
const transactionsRouter = require("./routers/transactions");
const summaryRouter = require("./routers/summary");
const detailedTransactionsRouter = require("./routers/detailedTransactions");

const app = express();
const port = 3000;

// Enable parsing JSON data in request body
app.use(bodyParser.json());
app.use(verifyToken);

// Enable CORS if needed (adjust configuration as needed)
app.use(cors());

// ... Implement API routes using Express routers (refer to previous responses for details)
app.use("/users", usersRouter); // (Optional)
app.use("/assets", assetsRouter);
app.use("/transactions", transactionsRouter);
app.use("/summary", summaryRouter);
app.use("/detailedTransactions", detailedTransactionsRouter);

// Error handling middleware (example)
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for analysis
  res.status(500).json({ error: "Internal Server Error" }); // Send generic error response
});

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  try {
    // Connect to database (consider using a connection pool)
    await db.query("SELECT 1");
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
});
