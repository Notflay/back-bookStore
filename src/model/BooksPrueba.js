import { Schema, model } from "mongoose";

const booksPruebaSchema = new Schema({
  authors: {
    type: String,
  },
  desc: { type: String },
  error: { type: String },
  image: { type: String },
  isbn10: { type: String },
  isbn13: { type: String },
  language: { type: String },
  pages: { type: String },
  price: { type: String },
  publisher: { type: String },
  rating: { type: String },
  subtitle: { type: String },
  title: { type: String },
  url: { type: String },
  year: { type: String },
});

export default model("booksPrueba", booksPruebaSchema);
