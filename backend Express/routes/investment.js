const express = require('express');
const router = express.Router();

const {
  createInvestment,
  getInvestmentDetails,
  calculateInvestment,
  getAllInvestments,
} = require('../controllers/investmentController');

router.post('/', createInvestment); 
router.get('/:id', getInvestmentDetails); 
router.post('/calculate', calculateInvestment);
router.get('/', getAllInvestments);

module.exports = router;