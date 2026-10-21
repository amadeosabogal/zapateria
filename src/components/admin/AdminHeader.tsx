import React from 'react';
import { ArrowLeft, LogOut, ShoppingBag, Menu, X } from 'lucide-react';
import { useApp } from '../../context/useApp';

interface AdminHeaderProps {
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  isMobileMenuOpen, 
  onToggleMobileMenu 
}) => {
  const { goToStore, logoutAdmin } = useApp();

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-header-left">
          {/* Mobile hamburger menu button */}
          <button
            type="button"
            className="mobile-menu-toggle-btn"
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="admin-brand">
            <span className="porto-badge">PORTO</span>
            <span className="admin-subtext">Panel Admin</span>
          </div>
        </div>

        <div className="admin-header-right">
          <button
            type="button"
            className="btn-admin-nav btn-store-return"
            onClick={goToStore}
            title="Regresar a la tienda de calzado"
          >
            <ArrowLeft size={16} />
            <ShoppingBag size={16} />
            <span className="btn-store-text">Volver a la Tienda</span>
          </button>

          <div className="admin-user-info">
            <div className="admin-avatar" title="Admin General (admin@porto.com)">A</div>
            <div className="admin-user-details">
              <span className="admin-name">Admin General</span>
              <span className="admin-email">admin@porto.com</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-admin-logout"
            onClick={logoutAdmin}
            title="Cerrar sesión de administrador"
            aria-label="Cerrar sesión"
          >
            <LogOut size={16} />
            <span className="logout-text">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
