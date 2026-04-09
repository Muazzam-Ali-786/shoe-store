export default function Success() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', color: '#28a745', marginBottom: '1rem' }}>Payment Successful 🎉</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Thank you for your purchase!</p>
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

