const express = require("express");
const summaryService = require("../services/summary.service");

const router = express.Router();

// Get summary for a year and optional month
router.get("/:year?", async (req, res) => {
  const year = req.params.year;
  const month = req.query.month; // Access month from query parameter
  try {
    const summary = await summaryService.getSummary(year, month);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
