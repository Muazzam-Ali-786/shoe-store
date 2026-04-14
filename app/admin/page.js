"use client";

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import './admin.css';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    description: '',
    category: 'adults',
    gender: 'MEN',
    stock: 50
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error('Please select an image file');
      return;
    }

    setLoading(true);
    
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      data.append('image', imageFile);

      const res = await fetch('/api/products/add', {
        method: 'POST',
        // No Content-Type header so browser sets multipart/form-data with boundary automatically
        body: data,
      });

      const responseData = await res.json();
      if (responseData.success) {
        toast.success('Product added successfully!');
        setFormData({
          name: '',
          brand: '',
          price: '',
          description: '',
          category: 'adults',
          gender: 'MEN',
          stock: 50
        });
        setImageFile(null);
        e.target.reset(); // Reset the file input field
      } else {
        toast.error(responseData.message || 'Failed to add product');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h1 className="admin-title">Admin Panel</h1>
        <p className="admin-subtitle">Add new premium footwear to your collection</p>
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Nike Air Jordan" required />
            </div>
            
            <div className="form-group">
              <label>Brand</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="e.g., Nike" required />
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="99.99" required />
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Mens">Mens</option>
                <option value="Womens">Womens</option>
              </select>
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="MEN">Men</option>
                <option value="WOMEN">Women</option>
                <option value="UNISEX">Unisex</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>Upload Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} required />
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe the product details and material..." required rows="4"></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
