"use client";
import Link from 'next/link';

export default function Cancel() {
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
        animation: 'shake 0.5s ease-in-out'
      }}>
        ❌
      </div>
      <h1 style={{ 
        fontSize: '3.5rem', 
        color: '#1a1a1a', 
        marginBottom: '1rem',
        fontWeight: '800',
        letterSpacing: '-1.5px'
      }}>
        Payment Cancelled
      </h1>
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#666', 
        marginBottom: '2.5rem',
        lineHeight: '1.6'
      }}>
        Order was not processed. No worries, your cart is still safe and you can try again whenever you're ready.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/cart" style={{ 
          padding: '1.25rem 2.5rem', 
          background: '#1a1a1a', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '50px', 
          fontWeight: '600',
          transition: 'all 0.3s ease',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          Back to Cart
        </Link>
        <Link href="/products" style={{ 
          padding: '1.25rem 2.5rem', 
          background: 'transparent', 
          color: '#1a1a1a', 
          textDecoration: 'none', 
          borderRadius: '50px', 
          fontWeight: '600',
          border: '2px solid #1a1a1a',
          transition: 'all 0.3s ease'
        }}>
          Continue Shopping
        </Link>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}

