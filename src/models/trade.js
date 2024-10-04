const { Schema, model } = require('mongoose');

// Trade Schema
const tradeSchema = new Schema({
  stockId: {
    type: String,
    required: true, // Stock ID (could be any alphanumeric string)
  },
  tradeDate: {
    type: Date,
    required: true,
  },
  pricePerShare: {
    type: Number,
    required: true, // Price of stock at the time of trade
  },
  quantity: {
    type: Number,
    required: true, // Number of stocks bought/sold
  },
  tradeType: {
    type: String,
    enum: ['buy', 'sell'],
    required: true, // Type of trade: buy or sell
  },
});

module.exports = model('Trade', tradeSchema);
