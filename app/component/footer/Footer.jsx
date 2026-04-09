import Link from 'next/link';
import "./footer.css";

export default function Footer() {
  return (
    <>
      <div className="mein-footer">
        <div className="footer-container">
          <div className="footer-col">
            <div className="logo">
              <Link href="/" className="footer-logo">
                ShoeStore
              </Link>
              <p>Premium footwear for every step of your journey.</p>
            </div>
            <div className="social-links">
              <Link href="/">Facebook</Link>
              <Link href="/">Instagram</Link>
              <Link href="/">Twitter</Link>
            </div>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <div className="link-list">
              <Link href="/">Shop</Link>
              <Link href="/">Cart</Link>
              <Link href="/">Wishlist</Link>
              <Link href="/">Track Order</Link>
            </div>
          </div>
          <div className="footer-col">
            <h3>Customer Service</h3>
            <div className="link-list">
              <Link href="/">About Us</Link>
              <Link href="/">Contact</Link>
              <Link href="/">Returns</Link>
              <Link href="/">Help</Link>
            </div>
          </div>
          <div className="footer-col">
            <h3>Contact Info</h3>
            <div className="link-list">
              <Link href="/">Mk developer</Link>
              <Link href="/">+1 (555) 123-4567</Link>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2024 ShoeStore. All rights reserved.</p>
        </div>
      </div>
    </>
  );
}
