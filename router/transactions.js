const express = require("express");
const transactionsService = require("../services/transactions.service");

const router = express.Router();

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await transactionsService.getAllTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await transactionsService.getTransactionById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a transaction
router.post("/", async (req, res) => {
  const { userId, type, category, amount, date } = req.body; // Replace with actual fields

  // Validate transaction data (e.g., check for required fields, valid type and category)
  // ...

  try {
    const transaction = await transactionsService.createTransaction(
      userId,
      type,
      category,
      amount,
      date
    );
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a transaction
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { type, category, amount, date } = req.body; // Replace with actual fields

  // Validate updated transaction data
  // ...

  try {
    const transaction = await transactionsService.updateTransaction(
      id,
      type,
      category,
      amount,
      date
    );
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await transactionsService.deleteTransaction(id);
    res.status(204).json({ message: "Transaction deleted successfully" }); // No content response
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
