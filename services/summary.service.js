const db = require("./db"); // Replace with your database connection

async function getSummary(year, month) {
  let sql = `
    SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS expense,
      SUM(amount) AS total
    FROM transactions
  `;

  // Add year filter if provided
  if (year) {
    sql += " WHERE YEAR(date) = ?";
    const params = [year];

    // Add month filter if both year and month are provided
    if (month) {
      sql += " AND MONTH(date) = ?";
      params.push(month);
    }
  } else {
    throw new Error("Year is required for summary");
  }

  const [results] = await db.query(sql, params);
  if (!results.length) {
    return null; // No data found for the given criteria
  }
  return results[0];
}

module.exports = {
  getSummary,
};
