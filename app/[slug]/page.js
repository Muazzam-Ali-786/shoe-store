 "use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import shoesData from '@/lib/shoesData';
import { addToCart } from '@/lib/reducers/cartSlice';
import './page.css';

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug;
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  
  const product = shoesData.find(p => p.slug === slug);
  const [currentImage, setCurrentImage] = useState(product?.imageURL || '');

  // Handle case where product might change or focus changes
  useEffect(() => {
    if (product) {
      setCurrentImage(product.imageURL);
    }
  }, [product]);

  const total = product ? product.price * quantity : 0;

  if (!product) {
    return (
      <div className="product-detail-page not-found">
        <div className="container">
          <h1>Product Not Found</h1>
          <Link href="/products">← Back to Products</Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.imageURL];

  return (
    <div className="product-detail-page">
      <div className="container">
        <Link href="/products" className="back-btn">← Back to Products</Link>
        
        <div className="product-detail-grid">
          <div className="product-image-section">
            <div className="main-image-container">
              <Image
                src={currentImage}
                alt={product.name}
                width={600}
                height={600}
                className="main-image"
                priority
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="thumbnail-gallery">
              {images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail-box ${currentImage === img ? 'active' : ''}`}
                  onMouseEnter={() => setCurrentImage(img)}
                  onClick={() => setCurrentImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} shadow ${index}`}
                    width={100}
                    height={100}
                    className="thumbnail-img"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="product-info-section">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-brand">{product.brand}</p>
            <div className="price-section">
              <span className="price">${product.price}</span>
            </div>
            
            <div className="inventory-status">
              {product.is_in_inventory ? (
                <>
                  <span className="stock">In Stock ({product.items_left} left)</span>
                </>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
            
            <div className="rating">★ {product.rating}</div>
            
            <div className="gender-category">
              <span>Gender: {product.gender}</span>
              <span>Category: {product.category.toUpperCase()}</span>
            </div>

            <div className="quantity-section">
              <label>Quantity</label>
              <div className="qty-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.items_left, quantity + 1))}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
            </div>

            <div className="total-display">
              <span className="total-label">Subtotal:</span>
              <span className="total-value">${total.toFixed(2)}</span>
            </div>

            <div className="add-to-cart-section">
              {product.is_in_inventory ? (
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => {
                    if (!user) {
                      toast.error('Please login first to add items to your cart');
                      router.push('/login');
                      return;
                    }
                    dispatch(addToCart({ ...product, quantity }));
                    toast.success(`Added ${quantity} ${product.name} to cart!`);
                  }}
                >
                  Add to Cart
                </button>
              ) : (
                <button className="add-to-cart-btn" disabled>
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="product-description-section">
          <h2>Description</h2>
          <p>{product.description}</p>
        </div>

        <div className="related-products-section">
          <h2>Related Products</h2>
          <p>More products like this coming soon...</p>
        </div>
      </div>
    </div>
  );
}
