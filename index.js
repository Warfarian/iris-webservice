'use strict';
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const alertsRouter = require('./routes/alerts');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Enable JSON body parsing
app.use(express.json());

// Logging
app.use(morgan('combined'));

// Rate limiter to protect against brute-force and DOS attacks
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // 1 minute window
  max: 100,                 // limit each IP to 100 requests per windowMs
  message: "Too many requests. Please try again later."
});
app.use(limiter);

// Mount the alerts router
app.use('/alerts', alertsRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
