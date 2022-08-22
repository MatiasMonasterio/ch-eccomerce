import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { PORT } from "./config/env";
import apiRouter from "./api";

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server init on port ${PORT}`);
});
