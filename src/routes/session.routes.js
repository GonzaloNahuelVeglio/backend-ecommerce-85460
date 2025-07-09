import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { getCurrent } from '../controllers/session.controller.js';

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


router.get('/current', passport.authenticate('jwt', { session: false }), getCurrent);

export default router;
