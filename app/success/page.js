"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/lib/reducers/cartSlice';
import Link from 'next/link';

export default function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div style={{ 
      padding: '6rem 2rem', 
      textAlign: 'center', 
      maxWidth: '800px', 
      margin: '0 auto',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ 
        fontSize: '5rem', 
        marginBottom: '1.5rem',
        animation: 'scale-up 0.5s ease-out'
      }}>
        ✅
      </div>
      <h1 style={{ 
        fontSize: '3.5rem', 
        color: '#1a1a1a', 
        marginBottom: '1rem',
        fontWeight: '800',
        letterSpacing: '-1.5px'
      }}>
        Payment Successful
      </h1>
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#666', 
        marginBottom: '2.5rem',
        lineHeight: '1.6'
      }}>
        Thank you for your purchase! Your order is being processed and will be shipped soon.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/products" style={{ 
          padding: '1.25rem 2.5rem', 
          background: '#1a1a1a', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '50px', 
          fontWeight: '600',
          transition: 'all 0.3s ease',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          Continue Shopping
        </Link>
        <Link href="/dashboard" style={{ 
          padding: '1.25rem 2.5rem', 
          background: 'transparent', 
          color: '#1a1a1a', 
          textDecoration: 'none', 
          borderRadius: '50px', 
          fontWeight: '600',
          border: '2px solid #1a1a1a',
          transition: 'all 0.3s ease'
        }}>
          View Orders
        </Link>
      </div>

      <style jsx>{`
        @keyframes scale-up {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

