import { config } from "dotenv";
import mongoose from "mongoose";
import MONGODB_URL from "./config";

config();

export const conexionMong = () => {
  try {
    mongoose.connect(MONGODB_URL);
    console.log("Server run");
  } catch (e) {
    console.log(e.message);
  }
};
