import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js';

import passport from 'passport';
import { adminOnly } from '../middlewares/roleAuth.js';

const router = Router();

router.get('/', getProducts);
router.get('/:pid', getProductById);
router.post('/', passport.authenticate('jwt', { session: false }), adminOnly, createProduct);
router.put('/:pid', passport.authenticate('jwt', { session: false }), adminOnly, updateProduct);
router.delete('/:pid', passport.authenticate('jwt', { session: false }), adminOnly, deleteProduct);

export default router;
