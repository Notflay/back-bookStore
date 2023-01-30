import mongoose from "mongoose";
import { config } from "dotenv";
import express from "express";

import cors from "cors";
import indexRoutes from "./routes/index.routes";
import cookieParser from "cookie-parser";

config();

const app = express();

try {
  mongoose.connect(process.env.MONGO_URL);
  console.log("connectado ");
} catch (e) {
  console.log(e.message);
}

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(indexRoutes);

app.listen(process.env.PORT || 8000);
console.log("server on port", 8000);
