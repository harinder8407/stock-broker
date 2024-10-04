const { Schema, model } = require('mongoose');

// Portfolio Schema
const portfolioSchema = new Schema({
  trades: [{
    type: Schema.Types.ObjectId,
    ref: 'Trade',
  }],
});

module.exports = model('Portfolio', portfolioSchema);
