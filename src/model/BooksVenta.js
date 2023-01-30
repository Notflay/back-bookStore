import { Schema, model } from "mongoose";

const BooksVentaSchema = new Schema({
  isbn13: { type: String },
  title: { type: String },
  desc: { type: String },
  price: { type: Number },
  image: { type: String },
  cantidad: { type: Number },
});

export default model("booksVenta", BooksVentaSchema);
