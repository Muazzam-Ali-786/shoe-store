"use client";

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function CheckoutBtn() {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items || []);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    // Redirect to the new premium checkout summary page
    router.push('/checkout');
  };

  return (
    <button 
      style={{
        width: '100%', 
        padding: '1.25rem', 
        background: 'linear-gradient(135deg, #111, #333)', 
        color: 'white', 
        border: 'none', 
        borderRadius: '50px', 
        fontSize: '1.1rem', 
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        marginTop: '1.5rem'
      }}
      onClick={handleCheckout}
      disabled={cartItems.length === 0}
    >
      Proceed to Checkout — ${total.toFixed(2)}
    </button>
  );
}


