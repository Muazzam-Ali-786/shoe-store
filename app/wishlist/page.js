"use client";

import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../../lib/reducers/wishlistSlice';
import Link from 'next/link';
import ProductCard from '../component/ProductCard';
import './page.css';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <h2>Your wishlist is empty</h2>
          <p>Add products you love to save them for later.</p>
          <Link href="/products" className="browse-btn">
            Browse Products →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="page-header">
        <h1>Wishlist ({wishlistItems.length})</h1>
      </div>
      <div className="wishlist-grid">
        {wishlistItems.map((product) => (
          <div key={product.id} className="wishlist-item">
            <ProductCard product={product} />
            <button 
              className="remove-btn"
              onClick={() => handleRemove(product.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

