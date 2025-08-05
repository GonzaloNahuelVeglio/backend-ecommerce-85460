import { CartModel } from '../models/Cart.js';

export class CartDAO {
  async findAll() {
    return CartModel.find();
  }

  async findById(id) {
    return CartModel.findById(id).populate('products.product');
  }

  async create(cartData) {
    return CartModel.create(cartData);
  }

  async updateById(id, updateData) {
    return CartModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async deleteById(id) {
    return CartModel.findByIdAndDelete(id);
  }

  async addProductToCart(cartId, productId, quantity) {
    return CartModel.findByIdAndUpdate(
      cartId,
      { $push: { products: { product: productId, quantity } } },
      { new: true }
    );
  }

  async removeProductFromCart(cartId, productId) {
    return CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true }
    );
  }

  async clearCart(cartId) {
    return CartModel.findByIdAndUpdate(
      cartId,
      { $set: { products: [] } },
      { new: true }
    );
  }
}
