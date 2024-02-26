const express = require("express");
const assetsService = require("../services/assets.service");

const router = express.Router();

// Get all assets
router.get("/", async (req, res) => {
  try {
    const assets = await assetsService.getAllAssets();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get assets by type
router.get("/:type", async (req, res) => {
  const type = req.params.type;
  try {
    const assets = await assetsService.getAssetsByType(type);
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create an asset
router.post("/", async (req, res) => {
  const { type, name, value } = req.body;
  try {
    await assetsService.createAsset(type, name, value);
    res.status(201).json({ message: "Asset created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an asset
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { type, name, value } = req.body;
  try {
    await assetsService.updateAsset(id, type, name, value);
    res.json({ message: "Asset updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an asset
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await assetsService.deleteAsset(id);
    res.json({ message: "Asset deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
