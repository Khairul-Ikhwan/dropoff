import rateLimit from "express-rate-limit";

const maxRequests = 109;

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: maxRequests,
  handler: (req, res) => {
    res.status(429).json({
      message: "You are being rate-limited. Please try again after 15 minutes",
      timeWindow: "15 minutes",
      maxRequests: maxRequests,
    });
  },
});
