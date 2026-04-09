export default function Cancel() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', color: '#dc3545', marginBottom: '1rem' }}>Payment Cancelled ❌</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>No worries, you can try again anytime.</p>
      <a href="/cart" style={{ 
        padding: '1rem 2rem', 
        background: '#6c757d', 
        color: 'white', 
        textDecoration: 'none', 
        borderRadius: '8px', 
        fontWeight: 'bold',
        marginRight: '1rem'
      }}>
        View Cart
      </a>
      <a href="/products" style={{ 
        padding: '1rem 2rem', 
        background: '#0070f3', 
        color: 'white', 
        textDecoration: 'none', 
        borderRadius: '8px', 
        fontWeight: 'bold' 
      }}>
        Continue Shopping
      </a>
    </div>
  );
}

