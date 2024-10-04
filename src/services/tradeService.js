const Trade = require('../models/trade');
const Portfolio = require('../models/portfolio');
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types
// Add a trade to the portfolio
const addNewTrade = async (tradeDetails) => {
    console.log(tradeDetails)
    const newTrade = new Trade(tradeDetails);

    // Save the trade and handle errors
    try {
        await newTrade.save();
    } catch (error) {
        throw new Error('Error saving the trade: ' + error.message);
    }

    let portfolio = await Portfolio.findOne();

    // Handle case where the portfolio does not exist
    if (!portfolio) {
        portfolio = new Portfolio({ trades: [newTrade._id] });
    } else {
        portfolio.trades.push(newTrade._id);
    }

    // Save the portfolio and handle errors
    try {
        await portfolio.save();
    } catch (error) {
        throw new Error('Error saving the portfolio: ' + error.message);
    }

    return newTrade;
};

// Update a trade
const modifyExistingTrade = async (tradeId, updatedDetails) => {
    // Find and update the trade, handle case where the trade is not found
    const updatedTrade = await Trade.findByIdAndUpdate({ _id: tradeId }, updatedDetails, { new: true });
    console.log(updatedTrade)

    if (!updatedTrade) {
        throw new Error('Trade not found.');
    }

    return updatedTrade;
};

// Delete a trade
const removeTrade = async (tradeId) => {
    // Find the trade and delete it, handle case where the trade is not found
    const trade = await Trade.findById(tradeId);

    if (!trade) {
        throw new Error('Trade not found.');
    }

    await Trade.findByIdAndDelete(tradeId);

    // Update the portfolio to remove the trade
    await Portfolio.updateOne({}, { $pull: { trades: tradeId } });
};

module.exports = {
    addNewTrade,
    modifyExistingTrade,
    removeTrade,
};
