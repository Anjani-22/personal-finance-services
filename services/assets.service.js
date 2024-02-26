const db = require("./db");
const Asset = require("./assets.model");

const DEMO_USER_ID = 1; // Replace with actual user ID for demo

async function getAllAssets() {
  const [results] = await db.query("SELECT * FROM assets WHERE user_id = ?", [
    DEMO_USER_ID,
  ]);
  return results.map(
    (row) => new Asset(row.id, row.user_id, row.type, row.name, row.value)
  );
}

async function getAssetsByType(type) {
  const [results] = await db.query(
    "SELECT * FROM assets WHERE user_id = ? AND type = ?",
    [DEMO_USER_ID, type]
  );
  return results.map(
    (row) => new Asset(row.id, row.user_id, row.type, row.name, row.value)
  );
}

async function createAsset(type, name, value) {
  await db.query(
    "INSERT INTO assets (user_id, type, name, value) VALUES (?, ?, ?, ?)",
    [DEMO_USER_ID, type, name, value]
  );
}

async function updateAsset(id, type, name, value) {
  await db.query(
    "UPDATE assets SET type = ?, name = ?, value = ? WHERE id = ?",
    [type, name, value, id]
  );
}

async function deleteAsset(id) {
  await db.query("DELETE FROM assets WHERE id = ?", [id]);
}

module.exports = {
  getAllAssets,
  getAssetsByType,
  createAsset,
  updateAsset,
  deleteAsset,
};
