import { ProductModel } from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, stock, category, code, thumbnails } = req.body;
    if (!title || !description || !price || !stock || !category || !code) {
      return res.status(400).json({ message: 'Faltan campos requeridos.' });
    }
    const exists = await ProductModel.findOne({ code });
    if (exists) return res.status(409).json({ message: 'El código ya existe.' });
    const product = await ProductModel.create({ title, description, price, stock, category, code, thumbnails });
    res.status(201).json({ message: 'Producto creado.', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto.' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos.' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductModel.findById(pid);
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
    const product = await ProductModel.findByIdAndUpdate(pid, update, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });
    res.status(200).json({ message: 'Producto actualizado.', product });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto.' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await ProductModel.findByIdAndDelete(pid);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado.' });
    res.status(200).json({ message: 'Producto eliminado.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto.' });
  }
};
