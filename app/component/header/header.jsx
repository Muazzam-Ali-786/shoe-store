"use client";
import Link from 'next/link';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
    return (
        <>
<header className="header">
    <nav className="nav-container" role="navigation">
                <div className="logo">
                    <Link href="/" className="header-logo ">
                    👟 ShoeStore
                    </Link>
                </div>
                <div className="nav-links-wrapper">
                    <ul className='header-links'>
                        <li><Link href="/" className="nav-link">Home</Link></li>
                        <li><Link href="/dashboard" className="nav-link">Dashboard</Link></li>
                        <li><Link href="/cart" className="nav-link">Cart (0)</Link></li>
                        <li><Link href="/login" className="nav-link">Login</Link></li>
                        <li><Link href="/signup" className="nav-link">Sign Up</Link></li>
                    </ul>

                </div>
                <div className='search-header'>
                    <input className='search-box' type="text" placeholder="🔍 Search products..." />
                </div>
                <button className="mobile-menu-btn" aria-label="Toggle menu">☰
                    <ol className='mobile-menu-links'>
                         <li><Link href="/" className="nav-link">Home</Link></li>
                        <li><Link href="/dashboard" className="nav-link">Dashboard</Link></li>
                        <li><Link href="/cart" className="nav-link">Cart (0)</Link></li>
                        <li><Link href="/login" className="nav-link">Login</Link></li>
                        <li><Link href="/signup" className="nav-link">Sign Up</Link></li>
                    </ol>
                </button>
            </nav>
            </header>
        </>
    )
}