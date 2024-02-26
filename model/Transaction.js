class Transaction {
  constructor(id, userId, type, category, amount, date) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.category = category;
    this.amount = amount;
    this.date = date;
  }
}

module.exports = Transaction;
