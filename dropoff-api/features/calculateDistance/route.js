import express from "express";
import * as calcDistanceController from "./controller.js";
import { validateRequest } from "../../utils/middleware.js";

const calcDistanceRouter = express.Router();

calcDistanceRouter.post(
  "/",
  validateRequest,
  calcDistanceController.calcDistance
);

export { calcDistanceRouter };
