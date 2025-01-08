import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./utils/consts.js";

//import routes
import { exampleRouter } from "./routes/example.js";
import { distanceCalcRouter } from "./routes/distanceCalc/distanceCalc.js";

const app = express();
app.use(cors());

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware to log ip
app.use((req, res, next) => {
  const singaporeTime = new Date().toLocaleString("en-SG", {
    timeZone: "Asia/Singapore",
  });
  console.log(`[${singaporeTime}] ${req.method} ${req.url} from IP: ${req.ip}`);
  next();
});

// homeroute
app.get("/", (req, res) => {
  res.status(200).json("This API route is working!");
});

// routes
app.use("/example", exampleRouter);
app.use("/calculate-distance", distanceCalcRouter);

// Add after your routes but before error handler
app.use((req, res) => {
  res.status(404).send("Not Found");
});
// Add after your routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
