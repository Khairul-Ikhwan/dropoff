import rateLimit from "express-rate-limit";

/**
 * Create a rate limiter middleware with a customizable maxRequests value.
 * Defaults to a max of 10 requests per 15 minutes.
 * @param {number} maxRequests - Maximum number of requests allowed per windowMs. Defaults to 10.
 * @returns {Function} - Express middleware for rate limiting.
 */
export const createRateLimiter = (maxRequests = 10) => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // Fixed 15 minutes
    max: maxRequests,
    handler: (req, res) => {
      res.status(429).json({
        message:
          "Requests are being rate-limited. Please try again after the time window.",
        maxRequests,
      });
    },
  });
};

// Example usage
// Default rate limiter (10 requests per 15 minutes)
export const rateLimiter = createRateLimiter();

// Custom rate limiter (e.g., 50 requests per 15 minutes)
export const customRateLimiter = createRateLimiter(50);
