import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import passport from "./passport";
import cluster from "./cluster";
import logger from "./logger";
import apiRouter from "./api";
import { PORT } from "./config/env";
import { ROOT_PATH } from "./config/app";

cluster(() => {
  const app = express();

  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(passport.initialize());
  app.use(express.static(ROOT_PATH + "/public"));

  app.use("/api", apiRouter);

  app.all("*", (req, res) => {
    res
      .status(404)
      .json({ error: -1, description: `Can't find ${req.originalUrl} on this server!` });
  });

  app.listen(PORT, () => logger.info(`Server init on http://localhost:${PORT}`));
});
