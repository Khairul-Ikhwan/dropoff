import express from "express";
import { validateRequest } from "../../utils/middleware.js";
import { rateLimiter } from "../../utils/rateLimiter.js";
import * as DistCalcController from "../../controllers/distanceCalc/distanceCalc.js";

const distanceCalcRouter = express.Router();

distanceCalcRouter.post(
  "/",
  rateLimiter,
  validateRequest,
  DistCalcController.calculateDistance
);

export { distanceCalcRouter };
