import passport from "passport";
import local from "passport-local";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

export const iniciarPassport = () => {
  // Estrategia de login local
  passport.use("login",
    new local.Strategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const usuario = await UserModel.findOne({ email: username }).lean();
          if (!usuario) return done(null, false, { message: "Usuario no encontrado." });
          if (!bcrypt.compareSync(password, usuario.password)) return done(null, false, { message: "Contraseña inválida." });

          delete usuario.password;
          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Estrategia JWT 
  passport.use("jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      async (jwt_payload, done) => {
        try {
          const usuario = await UserModel.findById(jwt_payload.id).lean();
          if (!usuario) return done(null, false, { message: "Token inválido." });

          delete usuario.password;
          return done(null, usuario);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
