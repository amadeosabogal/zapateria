import React, { useState } from 'react';
import { useApp } from '../../context/useApp';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useApp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast(`¡Gracias! Has sido suscrito con: ${email}`, 'success');
    setEmail('');
  };

  return (
    <div className="newsletter-section">
      <div className="container newsletter-container">
        <div className="newsletter-text">
          <h3>Suscríbete al Boletín</h3>
          <p>Entérate de toda la información más reciente</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Ingresa tu correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Correo electrónico para boletín"
          />
          <button type="submit">Suscribirse</button>
        </form>
      </div>
    </div>
  );
};
