import React from 'react';
import { ArrowLeft, LogOut, ShoppingBag } from 'lucide-react';
import { useApp } from '../../context/useApp';

export const AdminHeader: React.FC = () => {
  const { goToStore, logoutAdmin } = useApp();

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <div className="admin-header-left">
          <div className="admin-brand">
            <span className="porto-badge">PORTO</span>
            <span className="admin-subtext">Panel de Administración</span>
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
            <span>Volver a la Tienda</span>
          </button>

          <div className="admin-user-info">
            <div className="admin-avatar">A</div>
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
            <span>Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
