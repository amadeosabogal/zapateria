import React from 'react';
import { Truck, RotateCcw, Headset, CreditCard } from 'lucide-react';

export const FeaturesBar: React.FC = () => {
  return (
    <div className="features-bar">
      <div className="container features-grid">
        <div className="feature-item">
          <Truck className="feature-icon" />
          <div className="feature-text">
            <h4>Envío y Devolución Gratis</h4>
            <p>Envío gratis en pedidos mayores a S/ 200.</p>
          </div>
        </div>
        <div className="feature-item">
          <RotateCcw className="feature-icon" />
          <div className="feature-text">
            <h4>Garantía de Devolución</h4>
            <p>100% de devolución de tu dinero.</p>
          </div>
        </div>
        <div className="feature-item">
          <Headset className="feature-icon" />
          <div className="feature-text">
            <h4>Soporte en línea 24/7</h4>
            <p>Estamos aquí para ayudarte siempre.</p>
          </div>
        </div>
        <div className="feature-item">
          <CreditCard className="feature-icon" />
          <div className="feature-text">
            <h4>Pago Seguro</h4>
            <p>Tus datos están protegidos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
