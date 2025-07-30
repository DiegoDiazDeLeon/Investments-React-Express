const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  amount: Number,
  annualInterestRate: Number,
  startDate: Date,
  termMonths: Number
});

module.exports = mongoose.model('Investment', InvestmentSchema);
