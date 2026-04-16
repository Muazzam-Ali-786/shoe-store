"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../lib/reducers/wishlistSlice';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="product-card-container">
      <Link href={`/${product.slug}`} className="product-card">
        <div className="product-image-container">
          <Image 
            src={product.image || product.imageURL} 
            alt={product.title || product.name} 
            fill
            className="product-image"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
          
        </div>
        <div className="card-info">
          <h3 className="product-title">{(product.title || product.name).slice(0, 50)}...</h3>
          <p className="product-brand">{product.brand}</p>
          <p className="price">${product.price}</p>
          {product.is_in_inventory ? (
            <p className="inventory">In Stock: {product.is_in_inventory ? `${product.items_left} left` : 'SOLD OUT'}
          </p>
          ) : (
            <p className="out-stock">Out of Stock</p>
          )}
        </div>
      </Link>
      <button 
        className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
        onClick={toggleWishlist}
        title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isInWishlist ? '💖' : '🤍'}
      </button>
    </div>
  );
}

