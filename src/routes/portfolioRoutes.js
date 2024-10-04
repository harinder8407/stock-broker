const express = require('express');
const {
    addTradeController,
    updateTradeController,
    removeTradeController,
} = require('../controllers/tradeController');
const {
    getPortfolioController,
    getHoldingsController,
    getReturnsController,
    getAverageBuyPrice
} = require('../controllers/portfolioController');

const router = express.Router();

// Portfolio routes
router.get('/portfolio', getPortfolioController);
router.get('/holdings', getHoldingsController);
router.get('/returns', getReturnsController);


// Trade routes
router.post('/addTrade', addTradeController);
router.post('/updateTrade', updateTradeController);
router.post('/removeTrade', removeTradeController);

module.exports = router;
