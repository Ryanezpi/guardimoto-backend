import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // max 60 requests per window per IP
  message: { message: 'Too many requests, please try again later.' },
});

export default limiter;
