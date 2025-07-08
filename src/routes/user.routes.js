import { Router } from 'express';
import { createUser, getUsers, getUserById,updateUser , deleteUser } from '../controllers/user.controller.js';
import passport from "passport";

const router = Router();

// Ruta para crear user
router.post('/', createUser);

// Ruta para obtener todos los usuarios
router.get('/', passport.authenticate("jwt", { session: false }), getUsers);

// Ruta para obtener un usuario por ID
router.get('/:uid', getUserById);

// Ruta para actualizar un usuario por ID
router.put('/:uid',  passport.authenticate("jwt", { session: false }), updateUser);

// Ruta para eliminar un usuario por ID
router.delete('/:uid',  passport.authenticate("jwt", { session: false }), deleteUser);

export default router;
