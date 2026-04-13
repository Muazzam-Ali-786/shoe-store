"use client";
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import './page.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items || []);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      if (session.url) {
        window.location.href = session.url;
      } else {
        // Fallback for older sessions if needed, though deprecated
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Something went wrong with checkout");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <h1>No Items for Checkout</h1>
          <Link href="/cart" className="back-btn">← Back to Cart</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1 className="checkout-title">Order Summary</h1>
      </div>
      
      <div className="checkout-items">
        <div className="checkout-item-list">
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <div className="checkout-item-image">
                <img src={item.imageURL} alt={item.name} />
              </div>
              <div className="checkout-item-info">
                <h4>{item.name}</h4>
                <p>{item.brand} • Qty: {item.quantity}</p>
              </div>
              <div className="checkout-item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="summary-section">
          <h3 className="summary-title">Order Total</h3>
          <div className="summary-row">
            <span>{totalItems} items</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span className="summary-total-price">${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            className="checkout-btn" 
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Complete Order'}
          </button>
          <Link href="/cart" className="back-btn" style={{display: 'block', textAlign: 'center', marginTop: '1rem'}}>← Back to Cart</Link>
        </div>
      </div>
    </div>
  );
}


