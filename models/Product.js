import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  category: { type: String, required: true },
  gender: { type: String, required: true },
  stock: { type: Number, default: 0 },
  rating: { type: String, default: "0" },
  is_in_inventory: { type: Boolean, default: true },
  items_left: { type: Number, default: 0 },
  slug: { type: String, required: true, unique: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
