const Investment = require('../Investment');

const createInvestment = async (req, res) => {
  try {
    const investment = new Investment(req.body);
    await investment.save();
    res.status(201).json(investment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getInvestmentDetails = async (req, res) => {
  try {
    const investment = await Investment.findById(req.params.id);
    if (!investment) return res.status(404).json({ error: 'error al buscar inversion' });

    const monthlyRate = investment.annualInterestRate / 12 / 100;
    const monthlyReturn = investment.amount * monthlyRate;
    const returnAfter12Months = monthlyReturn * 12;
    const totalAfterTerm = investment.amount + (monthlyReturn * investment.termMonths);
    const totalReturn = monthlyReturn * investment.termMonths;

    res.json({
      investment,
      monthlyReturn: +monthlyReturn.toFixed(2),
      returnAfter12Months: +returnAfter12Months.toFixed(2),
      totalAfterTerm: +totalAfterTerm.toFixed(2),
      totalReturn: +totalReturn.toFixed(2)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const calculateInvestment = async (req, res) => {
  try {
    const { amount, annualInterestRate, termMonths } = req.body;

    if (!amount || !annualInterestRate || !termMonths) {
      return res.status(400).json({ error: 'faltan datos' });
    }

    const monthlyRate = annualInterestRate / 12 / 100;
    const monthlyReturn = amount * monthlyRate;
    const returnAfter12Months = monthlyReturn * 12;
    const totalAfterTerm = amount + (monthlyReturn * termMonths);
    const totalReturn = monthlyReturn * termMonths;

    res.json({
      monthlyReturn: +monthlyReturn.toFixed(2),
      returnAfter12Months: +returnAfter12Months.toFixed(2),
      totalReturn: +totalReturn.toFixed(2),
      totalAfterTerm: +totalAfterTerm.toFixed(2),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllInvestments = async (req, res) => {
  try {
    const investments = await Investment.find();
    res.json(investments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createInvestment,
  getInvestmentDetails,
  calculateInvestment,
  getAllInvestments
};
