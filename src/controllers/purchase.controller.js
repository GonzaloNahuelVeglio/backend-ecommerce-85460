import { CartRepository } from '../repositories/cart.repository.js';
import { ProductRepository } from '../repositories/product.repository.js';
import { TicketRepository } from '../repositories/ticket.repository.js';
import { v4 as uuidv4 } from 'uuid';

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const ticketRepository = new TicketRepository();

export const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartRepository.getCartById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado.' });
    if (!cart.products || !Array.isArray(cart.products) || cart.products.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío.' });
    }

    let total = 0;
    const purchasedProducts = [];
    const notPurchased = [];

    // Validar stock y preparar productos a comprar
    for (const item of cart.products) {
      const product = await productRepository.getProductById(item.product);
      if (!product) {
        notPurchased.push({ product: item.product, reason: 'Producto no encontrado' });
        continue;
      }
      if (product.stock >= item.quantity) {
        total += product.price * item.quantity;
        purchasedProducts.push({ product: product._id, quantity: item.quantity });
      } else {
        notPurchased.push({ product: product._id, reason: 'Stock insuficiente' });
      }
    }

    if (purchasedProducts.length === 0) {
      return res.status(400).json({ message: 'No hay productos con stock suficiente para comprar.', notPurchased });
    }

    // Descontar stock
    for (const item of purchasedProducts) {
      const product = await productRepository.getProductById(item.product);
      await productRepository.updateProduct(product._id, { stock: product.stock - item.quantity });
    }

    // Generar ticket
    const ticket = await ticketRepository.createTicket({
      code: uuidv4(),
      amount: total,
      purchaser: req.user?.email || 'desconocido',
      products: purchasedProducts
    });

    // Vaciar carrito de productos comprados
    cart.products = cart.products.filter(item => !purchasedProducts.some(p => p.product.equals(item.product)));
    await cart.save();

    res.status(200).json({
      message: 'Compra realizada.',
      ticket,
      notPurchased,
      cart
    });
  } catch (error) {
    console.error('Error en la compra:', error);
    res.status(500).json({ message: 'Error al procesar la compra.' });
  }
};
