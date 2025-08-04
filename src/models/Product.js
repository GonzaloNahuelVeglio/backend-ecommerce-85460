import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  status: { type: Boolean, default: true },
  thumbnails: [{ type: String }]
}, { timestamps: true });

export const ProductModel = mongoose.model('Product', productSchema);
