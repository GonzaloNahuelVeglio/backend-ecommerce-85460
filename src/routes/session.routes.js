 import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info?.message || 'Credenciales inválidas.' });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login exitoso', token });
  })(req, res, next);
});

// Ruta protegida de ejemplo:
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ user: req.user });
});

export default router;
