'use strict';
module.exports = (req, res, next) => {
  const authHeader = req.headers['x-auth-token'];
  const expectedToken = process.env.ALERT_TOKEN;

  if (!authHeader || authHeader !== expectedToken) {
    return res.status(401).json({
      error: 'Unauthorized. Missing or invalid authentication token.'
    });
  }
  next();
};
