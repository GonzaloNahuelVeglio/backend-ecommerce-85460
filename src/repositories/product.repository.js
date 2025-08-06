import { ProductDAO } from '../daos/product.dao.js';

export class ProductRepository {
  constructor() {
    this.productDao = new ProductDAO();
  }

  async getAllProducts() {
    return this.productDao.findAll();
  }

  async getProductById(id) {
    return this.productDao.findById(id);
  }

  async createProduct(productData) {
    return this.productDao.create(productData);
  }

  async updateProduct(id, updateData) {
    return this.productDao.updateById(id, updateData);
  }

  async deleteProduct(id) {
    return this.productDao.deleteById(id);
  }

  async getProductsByCategory(category) {
    return this.productDao.findByCategory(category);
  }
}
