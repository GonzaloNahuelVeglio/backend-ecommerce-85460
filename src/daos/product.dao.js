import { ProductModel } from '../models/Product.js';

export class ProductDAO {
  async findAll() {
    return ProductModel.find();
  }

  async findById(id) {
    return ProductModel.findById(id);
  }

  async create(productData) {
    return ProductModel.create(productData);
  }

  async updateById(id, updateData) {
    return ProductModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  async deleteById(id) {
    return ProductModel.findByIdAndDelete(id);
  }

  async findByCategory(category) {
    return ProductModel.find({ category });
  }
}
