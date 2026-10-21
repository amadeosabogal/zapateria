import React from 'react';
import { Search, User, Heart, ShoppingCart } from 'lucide-react';
import { useApp } from '../../context/useApp';

export const Header: React.FC = () => {
  const { enterAdminPanel, isAdmin } = useApp();

  return (
    <header className="header">
      <div className="container">
        <div className="logo" style={{ cursor: 'pointer' }}>
          <h1>PORTO</h1>
          <span>eCommerce</span>
        </div>

        <div className="header-icons">
          <button 
            type="button" 
            className="icon-btn" 
            title="Buscar productos"
            aria-label="Buscar"
          >
            <Search size={24} />
          </button>

          {/* User / Person Icon Button to access Admin Panel */}
          <button 
            type="button" 
            className={`icon-btn person-btn ${isAdmin ? 'admin-logged' : ''}`}
            onClick={enterAdminPanel}
            title={isAdmin ? "Ir al Panel Administrativo (Administrador activo)" : "Acceso Administrativo / Mi Cuenta"}
            aria-label="Cuenta y Administración"
            id="admin-user-btn"
          >
            <User size={24} />
            {isAdmin && <span className="admin-status-indicator" title="Sesión de Administrador Activa" />}
          </button>

          <button 
            type="button" 
            className="icon-btn" 
            title="Lista de deseos"
            aria-label="Favoritos"
          >
            <Heart size={24} />
          </button>

          <button 
            type="button" 
            className="icon-btn" 
            title="Ver carrito de compras"
            aria-label="Carrito"
          >
            <ShoppingCart size={24} />
            <span className="cart-count">0</span>
          </button>
        </div>
      </div>
    </header>
  );
};
