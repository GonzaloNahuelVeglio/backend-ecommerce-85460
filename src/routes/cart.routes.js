import { Router } from 'express';
import { createCart, getCart, addProductToCart, removeProductFromCart } from '../controllers/cart.controller.js';
import passport from 'passport';

const router = Router();

// Solo user puede agregar productos a su carrito
const userOnly = (req, res, next) => {
  if (req.user?.role !== 'user') return res.status(403).json({ message: 'Solo usuarios pueden modificar carritos.' });
  next();
};

router.post('/', passport.authenticate('jwt', { session: false }), createCart);
router.get('/:cid', passport.authenticate('jwt', { session: false }), getCart);
router.post('/:cid/products', passport.authenticate('jwt', { session: false }), userOnly, addProductToCart);
router.delete('/:cid/products/:productId', passport.authenticate('jwt', { session: false }), userOnly, removeProductFromCart);

export default router;
