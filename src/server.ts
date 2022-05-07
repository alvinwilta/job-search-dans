import express from "express";
import cors from "cors";
import config from "./config/config";
import setupRoute from "./routes";
import { StatusCodes } from "http-status-codes";
import connectDB from "./utils/connect";
import logger from "./utils/logger";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res
    .status(StatusCodes.OK)
    .send(
      'API Running, see documentation on <a href="https://dans-search-alvin-doc.herokuapp.com" target="_blank">https://dans-search-alvin-doc.herokuapp.com<a>'
    );
});

// Setup routes
setupRoute(app);

app.listen(config.server.port, async () => {
  logger.info(
    `Server started at http://${config.server.hostname}:${config.server.port}`
  );
  await connectDB();
});

export default app;
