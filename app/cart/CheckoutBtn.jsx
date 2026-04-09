"use client";

import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function CheckoutBtn() {
  const [showTotal, setShowTotal] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }
    setShowTotal(true);
    alert(`Order confirmed! Total: $${total.toFixed(2)}\nPayment coming soon.`);
  };

  return (
    <button 
      style={{
        width: '100%', 
        padding: '1rem', 
        background: '#28a745', 
        color: 'white', 
        border: 'none', 
        borderRadius: '8px', 
        fontSize: '1.1rem', 
        fontWeight: 'bold',
        cursor: 'pointer'
      }}
      onClick={handleCheckout}
      disabled={cartItems.length === 0}
    >
      Place Order ($${total.toFixed(2)})
    </button>
  );
}


