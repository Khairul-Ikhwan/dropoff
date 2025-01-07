import express from "express";
import * as ExampleController from "../controllers/example.js";
import { validateRequest } from "../lib/middleware.js";

const exampleRouter = express.Router();

exampleRouter.get("/", validateRequest, ExampleController.exampleGETController);
exampleRouter.post(
  "/",
  validateRequest,
  ExampleController.examplePOSTController
);

export { exampleRouter };
