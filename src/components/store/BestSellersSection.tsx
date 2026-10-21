import React from 'react';
import { useApp } from '../../context/useApp';
import { ProductCard } from './ProductCard';

export const BestSellersSection: React.FC = () => {
  const { products } = useApp();
  const bestSellers = products.filter(p => p.isBestSeller || p.id > 4);

  return (
    <section className="bestsellers-section">
      <div className="section-title">
        <h2>Productos<span>Más Vendidos</span></h2>
        <div className="section-subtitle">Solo los productos más vendidos añadidos recientemente a nuestro catálogo</div>
      </div>

      <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {bestSellers.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
