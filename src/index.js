const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

// Import routes
const portfolioRoutes = require('./routes/portfolioRoutes');

// Use routes
app.use('/api', portfolioRoutes);

// Connect to MongoDB
const { connectDB } = require('./config/db');
connectDB();

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
