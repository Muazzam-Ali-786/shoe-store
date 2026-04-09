"use client";
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <h1>Order Summary</h1>
      <div style={{ border: '1px solid #ddd', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h3>Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</h3>
        <h2 style={{ color: '#0070f3' }}>${total.toFixed(2)}</h2>
        <p>Stripe integration ready - add keys to .env.local</p>
      </div>
      <Link href="/cart">
        <button style={{ 
          padding: '1rem 2rem', 
          background: '#dc3545', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px',
          fontSize: '1.1rem',
          cursor: 'pointer'
        }}>
          Back to Cart
        </button>
      </Link>
    </div>
  );
}


