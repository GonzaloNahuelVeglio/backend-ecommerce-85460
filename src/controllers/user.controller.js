import { UserModel } from '../models/Users.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        if (!first_name || !last_name || !email || !age || !password) {
            return res.status(400).json({ message: 'Faltan campos requeridos.' });
        }

        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'El email ya está registrado.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        if (!hashedPassword) {
            return res.status(500).json({ message: 'Error al hashear la contraseña.' });
        }

        const newUser = new UserModel({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: 'Usuario creado correctamente.',
            user: {
                _id: newUser._id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                age: newUser.age,
                role: newUser.role,
                cart: newUser.cart
            }
        });

    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({}, '-password');
        res.status(200).json(users);
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

        const user = await UserModel.findById(uid, '-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json(user);
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

        const updatedUser = await UserModel.findByIdAndUpdate(
            uid,
            { first_name, last_name, email, age, password: hashedPassword },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        updatedUser.password = undefined;
        res.status(200).json({
            message: 'Usuario actualizado correctamente.',
            user: updatedUser
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

        const deletedUser = await UserModel.findByIdAndDelete(uid);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
}
