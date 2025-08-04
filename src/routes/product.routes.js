import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import passport from 'passport';

const router = Router();

// Solo admin puede crear, actualizar y eliminar productos
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Solo admin autorizado.' });
  next();
};

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', passport.authenticate('jwt', { session: false }), adminOnly, createProduct);
router.put('/:pid', passport.authenticate('jwt', { session: false }), adminOnly, updateProduct);
router.delete('/:pid', passport.authenticate('jwt', { session: false }), adminOnly, deleteProduct);

export default router;
