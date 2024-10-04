# Stock Broker Portfolio Management API

## API Endpoints

### Portfolio Management Endpoints

- **GET** `/api/portfolio`: Retrieve the entire portfolio.
- **GET** `/api/holdings`: Retrieve holdings with average buying price.
- **GET** `/api/returns`: Retrieve cumulative returns.
- **POST** `/api/addTrade`: Add a new trade.
- **POST** `/api/updateTrade`: Update an existing trade.
- **POST** `/api/removeTrade`: Remove a trade.
- **GET** `/api/average`: Retrieve average buying price.

## Data Model Design

### Trade Schema

```javascript
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
