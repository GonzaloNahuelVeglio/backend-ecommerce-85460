import { UserRepository } from '../repositories/user.repository.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const userRepository = new UserRepository();
const tokens = new Map();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    if (!email || typeof email !== 'string' || !email.includes('@')) return res.status(400).json({ message: 'Email inválido.' });
    const user = await userRepository.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 60 * 60 * 1000; // 1 hora
    tokens.set(token, { email, expires });

    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${token}`;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperación de contraseña',
        html: `
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
            <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); padding: 24px;">
                <h2 style="color: #333; margin-bottom: 16px;">Recuperación de contraseña</h2>
                <p style="color: #555; margin-bottom: 24px;">
                    Haz click en el siguiente botón para restablecer tu contraseña.<br>
                    <span style="color: #888;">El enlace expira en 1 hora.</span>
                </p>
                <a href="${resetUrl}" style="display: inline-block; background: #1976d2; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: bold;">
                    Restablecer contraseña
                </a>
                <p style="color: #999; font-size: 13px; margin-top: 32px;">
                    Si no solicitaste este cambio, puedes ignorar este correo.
                </p>
            </div>
        </div>
    `
    });

    res.json({ message: 'Correo de recuperación enviado.' });
};

export const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    if (!token || typeof token !== 'string' || token.length < 10) return res.status(400).json({ message: 'Token inválido.' });
    if (!password || typeof password !== 'string' || password.length < 6) return res.status(400).json({ message: 'Contraseña inválida (mínimo 6 caracteres).' });
    const data = tokens.get(token);
    if (!data || data.expires < Date.now()) return res.status(400).json({ message: 'Token inválido o expirado.' });

  const user = await userRepository.getRawUserByEmail(data.email);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    if (!user.password) return res.status(500).json({ message: 'No se encontró la contraseña anterior del usuario.' });
    const samePassword = await bcrypt.compare(password, user.password);
    if (samePassword) return res.status(400).json({ message: 'La nueva contraseña no puede ser igual a la anterior.' });

    const hashed = await bcrypt.hash(password, 10);
    await userRepository.updateUser(user._id, { password: hashed });
    tokens.delete(token);
    res.json({ message: 'Contraseña restablecida correctamente.' });
};
