import React from 'react';
import { useApp } from '../../context/useApp';
import { ProductCard } from './ProductCard';

export const FeaturedProductsSection: React.FC = () => {
  const { products } = useApp();
  const featured = products.filter(p => p.isFeatured || p.id <= 4);

  return (
    <section id="destacados" className="featured-section">
      <div className="section-title">
        <h2>Productos<span>Destacados</span></h2>
        <div className="section-subtitle">Increíbles productos añadidos recientemente a nuestro catálogo</div>
      </div>

      <div className="product-grid">
        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
