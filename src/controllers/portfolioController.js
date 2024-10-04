const {
    retrievePortfolio,
    getAverageBuyPrice,
    getCumulativeReturns
} = require('../services/portfolioService');

const getPortfolioController = async (req, res) => {
    try {
        const portfolio = await retrievePortfolio(req);
        if (!portfolio) {
            return res.status(404).json({ success: false, message: 'Portfolio not found' });
        }
        res.json({ success: true, data: portfolio });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while retrieving the portfolio.' });
    }
};

const getHoldingsController = async (req, res) => {
    try {
        const avgPrice = await getAverageBuyPrice(req);
        res.json({ success: true, averageBuyingPrice: avgPrice });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while retrieving holdings.' });
    }
};

const getReturnsController = async (req, res) => {
    try {
        const cumulativeReturn = await getCumulativeReturns(req);
        res.json({ success: true, cumulativeReturn });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while retrieving returns.' });
    }
};


module.exports = {
    getPortfolioController,
    getHoldingsController,
    getReturnsController,
};
