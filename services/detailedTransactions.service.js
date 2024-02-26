const db = require("./db"); // Replace with your database connection

async function getDetailedTransactions(type, year) {
  let sql = "SELECT * FROM transactions WHERE type = ?";
  const params = [type];

  // Add year filter if provided
  if (year) {
    sql += " AND YEAR(date) = ?";
    params.push(year);
  }

  const [results] = await db.query(sql, params);
  return results;
}

// ... Additional functionalities as needed (e.g., fetching categorized transactions)

module.exports = {
  getDetailedTransactions,
};
