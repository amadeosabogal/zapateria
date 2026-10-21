import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <main className="hero">
      <div className="hero-content">
        <div className="hero-subtitle">Nueva Colección Marrón</div>
        <h2 className="hero-title">Venta de Verano<br/>30% DCTO</h2>
        <div className="hero-price">
          DESDE <span>S/ 140<sup>00</sup></span>
        </div>
        <a href="#destacados" className="btn-primary">¡Lleva el tuyo!</a>
      </div>
      <img 
        src="/shoes/hero.png" 
        alt="Zapatos Marrones Elegantes" 
        className="hero-image"
      />
    </main>
  );
};
