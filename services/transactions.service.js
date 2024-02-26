const db = require("./db"); // Replace with your database connection

async function getAllTransactions() {
  const [results] = await db.query("SELECT * FROM transactions");
  return results;
}

async function getTransactionById(id) {
  const [results] = await db.query("SELECT * FROM transactions WHERE id = ?", [
    id,
  ]);
  return results.length ? results[0] : null;
}

async function createTransaction(userId, type, category, amount, date) {
  // Validate transaction data (e.g., check for required fields, valid type and category)
  // ...

  const [results] = await db.query(
    "INSERT INTO transactions (user_id, type, category, amount, date) VALUES (?, ?, ?, ?, ?)",
    [userId, type, category, amount, date]
  );
  return getTransactionById(results.insertId);
}

async function updateTransaction(id, type, category, amount, date) {
  // Validate updated transaction data
  // ...

  const result = await db.query(
    "UPDATE transactions SET type = ?, category = ?, amount = ?, date = ? WHERE id = ?",
    [type, category, amount, date, id]
  );

  // Ensure the transaction was updated successfully
  if (result.affectedRows === 0) {
    return null;
  }

  return getTransactionById(id);
}

async function deleteTransaction(id) {
  const result = await db.query("DELETE FROM transactions WHERE id = ?", [id]);

  // Ensure the transaction was deleted successfully
  if (result.affectedRows === 0) {
    throw new Error("Transaction not found");
  }
}

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
