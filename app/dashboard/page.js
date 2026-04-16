"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../lib/reducers/authSlice';
import Link from 'next/link';
import shoesData from '@/lib/shoesData';
import ProductCard from '../component/ProductCard';
import './page.css';

export default function DashboardPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  if (!user) {
    return (
      <div className="dashboard-page">
         
        <div className="container">
          <div style={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            <h2 style={{fontSize: '2rem'}}>Please <Link href="/login">login</Link> to view dashboard</h2>
          </div>
        </div>
      </div>
    );
  }

  const categories = [
    { name: 'Sneakers', emoji: '👟', desc: 'Premium quality & comfort' },
    { name: 'Boots', emoji: '🥾', desc: 'Premium quality & comfort' },
    { name: 'Sandals', emoji: '🩴', desc: 'Premium quality & comfort' },
    { name: 'Formal', emoji: '👞', desc: 'Premium quality & comfort' }
  ];

  return (
    <div className="dashboard-page">
      <div className="container">
<button 
            className="dashboard-logout"
            style={{margin: '8px 0 8px auto'}}
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>

        {/* Hero Stats - Cart Items & Wishlist */}
        <div className="stats-row">
          <div className="stat-left">
            <h2>Cart Items</h2>
            <div className="cart-count">{cartCount}</div>
          </div>
          <div className="wishlist-right">
            <h2>Wishlist ({wishlistItems.length})</h2>
            {wishlistItems.length === 0 ? (
              <p>No items in wishlist</p>
            ) : (
              <div className="wishlist-items">
                {wishlistItems.slice(0, 4).map((item) => (
                  <div key={item.id} className="wishlist-item-mini">
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Categories Section */}
        <section id="categories" className="categories-section">
          <h2 className="categories-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(cat.name)}
                className={`category-card ${selectedCategory === cat.name ? 'active' : ''}`}
              >
                <span className="category-emoji">{cat.emoji}</span>
                <h3 className="category-title">{cat.name}</h3>
                <p className="category-desc">{cat.desc}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="products-section">
          <div className="products-header">
            <h2 className="products-title">Featured Products</h2>
          </div>

          <div className="products-grid">
            {(selectedCategory 
              ? shoesData.filter(product => product.category === selectedCategory)
              : shoesData
            ).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

