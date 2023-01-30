import { Schema, model } from "mongoose";

const UsuariosSchema = new Schema({
  correo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlegnth: 9,
    maxlegnth: 20,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlegnth: 3,
    maxlegnth: 15,
  },
  apellidos: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlegnth: 3,
    maxlegnth: 15,
  },
  pass: {
    type: String,
    required: true,
    minlegnth: 3,
  },
});

export default model("Usuario", UsuariosSchema);
