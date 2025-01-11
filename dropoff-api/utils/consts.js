import dotenv from "dotenv";

dotenv.config();

// server port
export const PORT = process.env.PORT || 3000;

// environment
export const ENV = process.env.NODE_ENV || "development";

// api rate limiter
export const maxRequests = 10;

// google maps api key
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const GOOGLE_MAPS_JAVASCRIPT_API_KEY =
  process.env.GOOGLE_MAPS_JAVASCRIPT_API_KEY;
