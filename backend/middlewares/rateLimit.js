const rateLimit = require('express-rate-limit');

//initialize rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per windowMs
  message: 'Too many url generations, please try again later.',
});

module.exports = limiter;