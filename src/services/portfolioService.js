const Portfolio = require('../models/portfolio');

// Retrieve the portfolio with populated trades
const retrievePortfolio = async () => {
    try {
        const portfolio = await Portfolio.findOne().populate('trades');

        // Check if the portfolio exists
        if (!portfolio) {
            throw new Error('Portfolio not found');
        }

        return portfolio;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get average buying price (disregarding sells)
const getAverageBuyPrice = async () => {
    try {
        const portfolio = await Portfolio.findOne().populate('trades');

        // Check if portfolio exists
        if (!portfolio || portfolio.trades.length === 0) {
            throw new Error('No trades found in portfolio');
        }

        const buys = portfolio.trades.filter(trade => trade.tradeType === 'buy');

        // If there are no buy trades
        if (buys.length === 0) {
            return 0;
        }

        const totalAmountSpent = buys.reduce((acc, trade) => acc + (trade.pricePerShare * trade.quantity), 0);
        const totalQuantity = buys.reduce((acc, trade) => acc + trade.quantity, 0);

        return totalAmountSpent / totalQuantity;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get cumulative returns
const getCumulativeReturns = async () => {
    try {
        const portfolio = await Portfolio.findOne().populate('trades');
        console.log(portfolio)
        // Check if portfolio exists
        if (!portfolio || portfolio.trades.length === 0) {
            throw new Error('No trades found in portfolio');
        }

        const buys = portfolio.trades.filter(trade => trade.tradeType === 'buy');
        console.log(buys)

        // If there are no buy trades
        if (buys.length === 0) {
            return 0;
        }

        const totalQuantity = buys.reduce((acc, trade) => acc + trade.quantity, 0);

        const totalInitialCost = buys.reduce((acc, trade) => {
            return acc + (trade.pricePerShare * trade.quantity); // Use pricePerShare instead
        }, 0); const finalPrice = 100; // Assume final price to be 100

        const currentValue = totalQuantity * finalPrice;
        return currentValue - totalInitialCost;
    } catch (error) {
        throw new Error(error.message);
    }
};



module.exports = {
    retrievePortfolio,
    getAverageBuyPrice,
    getCumulativeReturns,
};
