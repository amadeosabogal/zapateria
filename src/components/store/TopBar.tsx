import React from 'react';
import { useApp } from '../../context/useApp';
import { ShieldCheck } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { isAdmin, enterAdminPanel } = useApp();

  return (
    <div className="top-bar">
      <div className="container">
        <div className="top-bar-left">
          <span>
            Obtén 10% de DCTO en la Colección Femenina Porto - <strong>¡Compra Ahora!</strong>
          </span>
        </div>
        <div className="top-bar-right">
          <button 
            type="button" 
            onClick={enterAdminPanel} 
            className="top-bar-link"
            title="Panel de Administración"
          >
            {isAdmin ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#e27c7c', fontWeight: 'bold' }}>
                <ShieldCheck size={13} /> Panel Admin
              </span>
            ) : (
              'Mi Cuenta'
            )}
          </button>
          <a href="#wishlist" onClick={(e) => e.preventDefault()}>Mi Lista de Deseos</a>
          <a href="#cart" onClick={(e) => e.preventDefault()}>Carrito</a>
          <button 
            type="button" 
            onClick={enterAdminPanel} 
            className="top-bar-link"
          >
            {isAdmin ? 'Admin Activo' : 'Iniciar Sesión'}
          </button>
          <select aria-label="Seleccionar moneda" defaultValue="PEN">
            <option value="PEN">PEN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <select aria-label="Seleccionar idioma" defaultValue="Esp">
            <option value="Esp">Esp</option>
            <option value="Eng">Eng</option>
          </select>
        </div>
      </div>
    </div>
  );
};
