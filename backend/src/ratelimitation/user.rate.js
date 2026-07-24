import rateLimit from "express-rate-limit";

export const leadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  // Maximum 5 lead submissions from one IP
  limit: 5,

  standardHeaders: "draft-7",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many submissions. Please try again later.",
  },
});
export const generalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});