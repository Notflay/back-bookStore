import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import Usuario from "../model/Usuarios";
import express from "express";

const signToken = (_id) => jwt.sign({ _id }, process.env.SECRET);

export const findAssingUser = async (req, res, next) => {
  try {
    var token = req.cookies.jwtToken;
    if (!token) {
      res.status(401).send("Unathorized token");
      res.cookie("autorizado", false);
    }

    let userId = jwt.verify(token, process.env.SECRET)._id;

    const user = await Usuario.findById(userId);

    if (!user) {
      res.status(401).send("Usuario no existe").end();
      res.cookie("autorizado", false);
    }

    req.auth = user;
    res.cookie("autorizado", true);
    next();
  } catch (error) {
    next(error);
  }
};

export const isAuthenticated = express.Router().use(findAssingUser);

export const createUsuario = async (req, res) => {
  try {
    const { body } = req;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(body.pass, salt);
    console.log(body);

    const usuario = Usuario({
      correo: body.correo,
      nombre: body.nombre,
      apellidos: body.apellidos,
      pass: hashed,
      salt,
    });

    if (usuario) {
      await usuario.save();
    } else {
      console.log("No se puso crear el usuario");
    }
    res.status(201).send(usuario);
  } catch (error) {
    res.status(401).send(error);
  }
};

export const login = async (req, res) => {
  try {
    const { body } = req;
    const usuario = await Usuario.findOne({ correo: body.correo });
    if (!usuario) {
      return res.status(401).send("Usuario y/o contraseña no existe");
    } else {
      const compare = await bcrypt.compare(body.pass, usuario.pass);
      if (!compare) {
        return res.status(403).send("Usuario y/o contraseña no existe");
      } else {
        console.log(usuario);
        const sign = signToken(usuario._id);
        res.cookie("jwtToken", sign);
        res.status(200).send(sign);
      }
    }
  } catch (error) {
    res.status(403).send(error.message);
  }
};
