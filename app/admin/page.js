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
    imageURL: '',
    category: 'adults',
    gender: 'MEN',
    stock: 50
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Product added successfully!');
        setFormData({
          name: '',
          brand: '',
          price: '',
          description: '',
          imageURL: '',
          category: 'adults',
          gender: 'MEN',
          stock: 50
        });
      } else {
        toast.error(data.message || 'Failed to add product');
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
                <option value="adults">Adults</option>
                <option value="kids">Kids</option>
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
            <label>Image URL</label>
            <input type="url" name="imageURL" value={formData.imageURL} onChange={handleChange} placeholder="https://unsplash.com/..." required />
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
