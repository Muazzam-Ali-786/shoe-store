"use client";

import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '@/lib/reducers/wishlistSlice';
import { logout, verifyToken } from '@/lib/persistedAuthSlice';
import Link from 'next/link';
import ProductCard from '../component/ProductCard';
import './wishlist.css';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty-container">
        <div className="empty-content">
          <div className="empty-heart-icon">🤍</div>
          <h1>Your Wishlist is Waiting</h1>
          <p>Explore our premium collection and save your favorites here.</p>
          <Link href="/products" className="explore-btn">
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-wrapper">
      <div className="container">
        <div className="wishlist-header">
          <h1 className="wishlist-title">My Favorites <span className="count-badge">{wishlistItems.length}</span></h1>
          <p className="wishlist-subtitle">Items you've liked from our store</p>
        </div>
        
        <div className="wishlist-grid-container">
          {wishlistItems.map((product) => (
            <div key={product.id} className="wishlist-card-wrapper">
              <ProductCard product={product} />
              <button 
                className="wishlist-remove-btn"
                onClick={() => handleRemove(product.id)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
