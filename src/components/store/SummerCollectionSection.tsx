import React from 'react';

export const SummerCollectionSection: React.FC = () => {
  return (
    <section className="summer-collection-section">
      <div className="section-title">
        <h2>Colección<span>de Verano</span></h2>
        <div className="section-subtitle">Increíbles productos añadidos recientemente a nuestro catálogo</div>
      </div>

      <div className="summer-collection">
        <div className="banner banner-large">
          <img src="/shoes/collection.jpg" alt="Zapatos Elegantes" />
          <div className="banner-text banner-text-large">
            <h3>Zapatos</h3>
            <h4>Elegantes</h4>
          </div>
        </div>
        <div className="banner bg-dark">
          <div className="banner-text banner-text-small">
            <h4>Para Ella</h4>
          </div>
        </div>
        <div className="banner bg-dark">
          <div className="banner-text banner-text-small">
            <h4>Para Él</h4>
          </div>
        </div>
      </div>
    </section>
  );
};
