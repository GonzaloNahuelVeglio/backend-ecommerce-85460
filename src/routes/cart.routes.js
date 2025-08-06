import { Router } from 'express';
import { createCart, getCart, addProductToCart, removeProductFromCart } from '../controllers/cart.controller.js';
import { purchaseCart } from '../controllers/purchase.controller.js';

import passport from 'passport';
import { userOnly } from '../middlewares/roleAuth.js';

const router = Router();


router.post('/', passport.authenticate('jwt', { session: false }), createCart);
router.get('/:cid', passport.authenticate('jwt', { session: false }), getCart);
router.post('/:cid/products', passport.authenticate('jwt', { session: false }), userOnly, addProductToCart);
router.delete('/:cid/products/:productId', passport.authenticate('jwt', { session: false }), userOnly, removeProductFromCart);
router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), userOnly, purchaseCart);

export default router;
