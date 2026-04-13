"use client";

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import CheckoutBtn from './CheckoutBtn';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '@/lib/reducers/cartSlice';
import './cart.css';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <Link href="/products" className="empty-cart-link">Continue Shopping →</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">Shopping Cart ({totalItems} items)</h1>
        <Link href="/products" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>

      <div className="cart-main">
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-image">
                <img src={item.imageURL} alt={item.name} />
              </div>
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>{item.brand}</p>
                <div className="cart-qty-controls">
                  <button 
                    className="cart-qty-btn"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    −
                  </button>
                  <span className="cart-qty-value">{item.quantity}</span>
                  <button 
                    className="cart-qty-btn"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                  <button 
                    className="cart-remove-item"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className="cart-item-price">
                ${ (item.price * item.quantity).toFixed(2) }
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h3 className="summary-title">Cart Summary</h3>
            <div className="summary-row">
              <span>Subtotal ({totalItems} items):</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span className="summary-total-price">${totalPrice.toFixed(2)}</span>
            </div>
            <CheckoutBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

