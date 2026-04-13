"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from './component/ProductCard';
import shoesData from '../lib/shoesData';
import './page.css';
import './products/products.css';

export default function HomePage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [products, setProducts] = useState(shoesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && data.products.length > 0) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="products-section">
        <div className="page-header">
          <h1>{searchQuery ? `Search: "${searchQuery}" (${filteredProducts.length} results)` : 'Featured Products'}</h1>
        </div>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

