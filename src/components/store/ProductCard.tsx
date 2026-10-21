import React from 'react';
import { Heart } from 'lucide-react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {product.countdown && <span className="product-badge countdown">{product.countdown}</span>}
        <div className="product-actions">
          <button type="button" className="action-btn" title="Añadir a deseos">
            <Heart size={16} />
          </button>
        </div>
      </div>
      <div className="product-category">{product.category}</div>
      <h3 className="product-title">{product.name}</h3>
      <div className="product-rating">★★★★★</div>
      <div className="product-price">
        {product.oldPrice && <del>{product.oldPrice}</del>}
        {product.price}
      </div>
    </div>
  );
};
