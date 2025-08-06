import { ProductRepository } from '../repositories/product.repository.js';

const productRepository = new ProductRepository();
export const createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category, code, thumbnails } = req.body;
    if (!title || typeof title !== 'string' || title.trim().length < 2) {
      return res.status(400).json({ message: 'Título inválido.' });
    }
    if (!description || typeof description !== 'string' || description.trim().length < 5) {
      return res.status(400).json({ message: 'Descripción inválida.' });
    }
    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ message: 'Precio inválido.' });
    }
    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ message: 'Stock inválido.' });
    }
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ message: 'Categoría inválida.' });
    }
    if (!code || typeof code !== 'string' || code.trim().length < 2) {
      return res.status(400).json({ message: 'Código inválido.' });
    }
    const products = await productRepository.getAllProducts();
    const exists = products.find(p => p.code === code);
    if (exists) return res.status(409).json({ message: 'El código ya existe.' });
    const product = await productRepository.createProduct({ title, description, price, stock, category, code, thumbnails });
    res.status(201).json({ message: 'Producto creado.', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto.' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productRepository.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos.' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productRepository.getProductById(pid);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto.' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const update = req.body;
    const product = await productRepository.updateProduct(pid, update);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });
    res.status(200).json({ message: 'Producto actualizado.', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto.' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productRepository.deleteProduct(pid);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });
    res.status(200).json({ message: 'Producto eliminado.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto.' });
  }
};
