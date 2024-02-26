const express = require("express");
const detailedTransactionsService = require("../services/detailedTransactions.service");

const router = express.Router();

// Get detailed transactions for a type and optional year
router.get("/transactions/:type/:year?", async (req, res) => {
  const type = req.params.type;
  const year = req.params.year;
  try {
    const transactions =
      await detailedTransactionsService.getDetailedTransactions(type, year);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
