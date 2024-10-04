const { addNewTrade, modifyExistingTrade, removeTrade } = require('../services/tradeService');

// Add a new trade
const addTradeController = async (req, res) => {
    const newTrade = await addNewTrade(req.body);
    res.json({ success: true, data: newTrade });
};

// Update an existing trade
const updateTradeController = async (req, res) => {
    const updatedTrade = await modifyExistingTrade(req.body.id, req.body);
    res.json({ success: true, data: updatedTrade });
};

// Remove a trade
const removeTradeController = async (req, res) => {
    await removeTrade(req.body.id);
    res.json({ success: true });
};

module.exports = {
    addTradeController,
    updateTradeController,
    removeTradeController,
};
