"use client";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout, verifyToken } from '@/lib/persistedAuthSlice';
import Link from 'next/link';
import './header.css';

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => (state.cart?.items || []).length || 0);
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value || '';
    router.push(`/?search=${query}`);
    setShowSearch(false);
  };

  const handleSearchIconClick = () => {
    setShowSearch(!showSearch);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <>
      <header className="header">
        <nav className="nav-container" role="navigation">
          <div className="logo">
            <Link href="/" className="header-logo ">
              👟 ShoeStore
            </Link>
          </div>
          <ul className='header-links'>
            <li><Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link></li>
            <li><Link href="/collections" className={`nav-link ${pathname.startsWith('/collections') ? 'active' : ''}`}>Collections</Link></li>
            <li><Link href="/products" className={`nav-link ${pathname.startsWith('/products') ? 'active' : ''}`}>Products</Link></li>
            <li><Link href="/admin" className={`nav-link ${pathname === '/admin' ? 'active' : ''}`}>Admin</Link></li>
            <li><Link href="/cart" className={`nav-link ${pathname === '/cart' ? 'active' : ''}`}>Cart({cartCount})</Link></li>
{user ? (
              <>
                <li className="nav-link welcome">Welcome,"{user.username}!"</li>
                <li><Link href="/dashboard" className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/login" className="nav-link">Login</Link></li>
                <li><Link href="/signup" className="nav-link">SignUp</Link></li>
              </>
            )}
          </ul>
          <div className="search-container">
            <button className="search-icon-btn" type="button" onClick={handleSearchIconClick}>
              🔍
            </button>
            <form className="search-header" onSubmit={handleSearch}>
              <input 
                type="text" 
                name="search" 
                className="search-box"
                placeholder="Search shoes..."
                defaultValue={search}
              />
            </form>
          </div>
          <div className="mobile-menu-container">
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              ☰
            </button>
          </div>
        </nav>
        {mobileMenuOpen && (
          <ul className={`mobile-menu-links ${mobileMenuOpen ? 'show' : ''}`}>
            <li><Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link></li>
            <li><Link href="/collections" className={`nav-link ${pathname.startsWith('/collections') ? 'active' : ''}`}>Collections</Link></li>
            <li><Link href="/products" className={`nav-link ${pathname.startsWith('/products') ? 'active' : ''}`}>Products</Link></li>
            <li><Link href="/admin" className={`nav-link ${pathname === '/admin' ? 'active' : ''}`}>Admin</Link></li>
            <li><Link href="/cart" className={`nav-link ${pathname === '/cart' ? 'active' : ''}`}>Cart({cartCount})</Link></li>
            {user ? (
              <>
                <li className="nav-link welcome">Welcome, "{user.username}!"</li>
                <li><Link href="/dashboard" className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/login" className="nav-link">Login</Link></li>
                <li><Link href="/signup" className="nav-link">SignUp</Link></li>
              </>
            )}
          </ul>
        )}
      </header>
    </>
  );
}
