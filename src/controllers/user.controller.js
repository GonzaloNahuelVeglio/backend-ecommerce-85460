import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { UserDAO } from '../daos/user.dao.js';
import { UserDTO } from '../dtos/user.dto.js';

const userDao = new UserDAO();

export const getUserByEmail = async (req, res) => {
  const user = await userDao.findByEmail(req.params.email);
  if (!user) return res.status(404).json({ message: 'No encontrado' });
  const userDto = new UserDTO(user);
  res.json(userDto);
};

export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos.' });
        }

        const userExists = await userDao.findByEmail(email);
        if (userExists) {
            return res.status(409).json({ message: 'El email ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json({ message: 'Error al hashear la contraseña.' });
        }

        const newUser = await userDao.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        });

        const userDto = new UserDTO(newUser);
        res.status(201).json({
            message: 'Usuario creado correctamente.',
            user: userDto
        });

    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await userDao.findAll();
        const usersDto = users.map(user => new UserDTO(user));
        res.status(200).json(usersDto);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;
        if (!mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const user = await userDao.findById(uid);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        const userDto = new UserDTO(user);
        res.status(200).json(userDto);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { first_name, last_name, email, age, password } = req.body;

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json({ message: 'Error al hashear la contraseña.' });
        }

        if (!mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const updatedUser = await userDao.updateById(uid, {
            first_name, last_name, email, age, password: hashedPassword
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        const userDto = new UserDTO(updatedUser);
        res.status(200).json({
            message: 'Usuario actualizado correctamente.',
            user: userDto
        });

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        if (!mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).json({ message: 'ID no válido.' });
        }

        const deletedUser = await userDao.deleteById(uid);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}
