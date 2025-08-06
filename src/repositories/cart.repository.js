import { CartDAO } from '../daos/cart.dao.js';

export class CartRepository {
  constructor() {
    this.cartDao = new CartDAO();
  }

  async getAllCarts() {
    return this.cartDao.findAll();
  }

  async getCartById(id) {
    return this.cartDao.findById(id);
  }

  async createCart(cartData) {
    return this.cartDao.create(cartData);
  }

  async updateCart(id, updateData) {
    return this.cartDao.updateById(id, updateData);
  }

  async deleteCart(id) {
    return this.cartDao.deleteById(id);
  }

  async addProductToCart(cartId, productId, quantity) {
    return this.cartDao.addProductToCart(cartId, productId, quantity);
  }

  async removeProductFromCart(cartId, productId) {
    return this.cartDao.removeProductFromCart(cartId, productId);
  }

  async clearCart(cartId) {
    return this.cartDao.clearCart(cartId);
  }
}
