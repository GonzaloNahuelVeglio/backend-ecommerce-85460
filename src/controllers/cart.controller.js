import { CartModel } from '../models/Cart.js';
import { ProductModel } from '../models/Product.js';

export const createCart = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user) return res.status(400).json({ message: 'Falta el usuario.' });
    const cart = await CartModel.create({ user, products: [] });
    res.status(201).json({ message: 'Carrito creado.', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear carrito.' });
  }
};

export const getCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).populate('products.product');
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado.' });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener carrito.' });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) return res.status(400).json({ message: 'Faltan datos.' });
    const cart = await CartModel.findById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado.' });
    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });
    const item = cart.products.find(p => p.product.equals(productId));
    if (item) {
      item.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    await cart.save();
    res.status(200).json({ message: 'Producto agregado al carrito.', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto al carrito.' });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, productId } = req.params;
    const cart = await CartModel.findById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado.' });
    cart.products = cart.products.filter(p => !p.product.equals(productId));
    await cart.save();
    res.status(200).json({ message: 'Producto eliminado del carrito.', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto del carrito.' });
  }
};
