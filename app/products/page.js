"use client";

import shoesData from '@/lib/shoesData';
import ProductCard from '../component/ProductCard';
import './products.css';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = shoesData.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1>Our Products</h1>
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

