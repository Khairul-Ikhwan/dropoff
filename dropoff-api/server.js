import express from "express";
import cors from "cors";
import morgan from "morgan";
import { PORT } from "./lib/consts.js";

//import routes
import { exampleRouter } from "./routes/example.js";

const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use routes
app.use("/example", exampleRouter);

// Add after your routes but before error handler
app.use((req, res) => {
  res.status(404).send("Not Found");
});
// Add after your routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
