'use strict';
const express = require('express');
const { body, validationResult } = require('express-validator');
const twilio = require('twilio');
const router = express.Router();

// Custom middleware to verify API token
const requireAuth = require('../middlewares/auth');

// Initialize Twilio client with credentials from environment variables
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


router.post(
  '/',
  requireAuth,
  [
    // Validate inputs
    body('phone')
      .notEmpty().withMessage('Phone number is required')
      .isMobilePhone().withMessage('Invalid phone number'),
    body('message')
      .notEmpty().withMessage('Message is required')
      .isString().withMessage('Message must be a string')
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { phone, message } = req.body;

    try {
      // Send SMS via Twilio API
      const result = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });

      return res.status(200).json({
        message: 'Alert sent successfully',
        sid: result.sid
      });
    } catch (error) {
      console.error('Error sending SMS:', error);
      return res.status(500).json({ error: 'Failed to send alert.' });
    }
  }
);

module.exports = router;
