import express from "express";
import { validateRequest } from "../../utils/middleware.js";
import { createRateLimiter, rateLimiter } from "../../utils/rateLimiter.js";
import * as DistCalcController from "../../controllers/distanceCalc/distanceCalc.js";

const distanceCalcRouter = express.Router();

const calculatorRateLimit = createRateLimiter(20);
distanceCalcRouter.post(
  "/",
  rateLimiter,
  validateRequest,
  DistCalcController.calculateDistance
);

const searchRateLimit = createRateLimiter(20);
distanceCalcRouter.post(
  "/complete-search",
  searchRateLimit,
  validateRequest,
  DistCalcController.placeAutoComplete
);

export { distanceCalcRouter };
