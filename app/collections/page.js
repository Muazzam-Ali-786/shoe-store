"use client";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../component/ProductCard';
import shoesData from '../../lib/shoesData';
import './collections.css';

const gender = ["all","Mens","Womens"];

export default function CollectionsPage() {
  const searchParams = useSearchParams();
  const cat = searchParams.get('cat') || 'all';

  const filteredShoes = cat === 'all' 
    ? shoesData 
    : shoesData.filter(shoe => shoe.gender === cat);

  return (
    <div className="collections-page">
      <div className="page-header">
        <h1>Collections</h1>
        <Link href="/" className="back-home">← Home</Link>
      </div>
      
      <div className="gender-tabs">
        {gender.map((g) => (
          <Link 
            key={g}
            href={`/collections?cat=${g}`}
            className={`gender-tab ${cat === g ? 'active' : ''}`}
          >
            {g.charAt(0).toUpperCase() + g.slice(1)}
          </Link>
        ))}
      </div>
      
      {filteredShoes.length > 0 ? (
        <div className="products-grid">
          {filteredShoes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-products">
          No products in this category yet.
        </div>
      )}
    </div>
  );
}
