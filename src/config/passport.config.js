import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { registerUserWithCart } from "../services/register.service.js";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET no definido en variables de entorno.");
}


export const iniciarPassport = () => {
   passport.use("login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const usuario = await UserModel.findOne({ email: username }).lean();
          if (!usuario) return done(null, false, { message: "Usuario no encontrado." });
          if (!await bcrypt.compare(password, usuario.password)) return done(null, false, { message: "Contraseña inválida." });

          delete usuario.password;
          return done(null, usuario);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

    // Estrategia de registro
  passport.use("register",
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;
          if (!first_name || !last_name || !email || !age || !password) {
            return done(null, false, { message: "Faltan campos requeridos." });
          }
          const userExists = await UserModel.findOne({ email });
          if (userExists) {
            return done(null, false, { message: "El email ya está registrado." });
          }
          const newUser = await registerUserWithCart({
            first_name,
            last_name,
            email,
            age,
            password
          });
          const userObj = newUser.toObject();
          delete userObj.password;
          return done(null, userObj);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


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
