import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, Package, ArrowLeft, X } from 'lucide-react';
import { useApp } from '../../context/useApp';

interface AdminSidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isMobileOpen, 
  onCloseMobile 
}) => {
  const { adminTab, setAdminTab, sales, customers, products, goToStore } = useApp();

  const pendingSalesCount = sales.filter(s => s.status === 'Pendiente').length;
  const lowStockCount = products.filter(p => (p.stock || 0) < 10).length;

  const handleSelectTab = (tab: typeof adminTab) => {
    setAdminTab(tab);
    onCloseMobile();
  };

  const handleReturnToStore = () => {
    goToStore();
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div 
          className="admin-sidebar-backdrop" 
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`admin-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Mobile Drawer Header with Close Button */}
        <div className="admin-sidebar-mobile-header">
          <div className="admin-brand">
            <span className="porto-badge">PORTO</span>
            <span className="admin-subtext">Navegación</span>
          </div>
          <button
            type="button"
            className="btn-close-sidebar"
            onClick={onCloseMobile}
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <div className="admin-sidebar-section">
          <span className="sidebar-section-title">MÓDULOS DEL SISTEMA</span>
          <nav className="admin-nav-menu">
            <button
              type="button"
              className={`admin-nav-item ${adminTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleSelectTab('overview')}
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${adminTab === 'inventory' ? 'active' : ''}`}
              onClick={() => handleSelectTab('inventory')}
            >
              <Package size={18} />
              <span>Gestión de Inventario</span>
              {lowStockCount > 0 ? (
                <span className="nav-badge pending" title={`${lowStockCount} modelos con poco stock`}>
                  {products.length}
                </span>
              ) : (
                <span className="nav-badge">{products.length}</span>
              )}
            </button>

            <button
              type="button"
              className={`admin-nav-item ${adminTab === 'sales' ? 'active' : ''}`}
              onClick={() => handleSelectTab('sales')}
            >
              <ShoppingBag size={18} />
              <span>Gestión de Ventas</span>
              {pendingSalesCount > 0 ? (
                <span className="nav-badge pending" title={`${pendingSalesCount} pedidos pendientes`}>
                  {pendingSalesCount}
                </span>
              ) : (
                <span className="nav-badge">{sales.length}</span>
              )}
            </button>

            <button
              type="button"
              className={`admin-nav-item ${adminTab === 'customers' ? 'active' : ''}`}
              onClick={() => handleSelectTab('customers')}
            >
              <Users size={18} />
              <span>Gestión de Clientes</span>
              <span className="nav-badge">{customers.length}</span>
            </button>
          </nav>
        </div>

        <div className="admin-sidebar-footer">
          <div className="admin-quick-stats-box">
            <span className="box-title">Estado de la Tienda</span>
            <div className="box-metric">
              <strong>{products.length}</strong> modelos en catálogo
            </div>
            <div className="box-metric">
              <strong>{sales.length}</strong> ventas registradas
            </div>
            <div className="box-metric">
              <strong>{customers.length}</strong> clientes activos
            </div>
          </div>

          <button 
            type="button" 
            className="admin-sidebar-return-btn"
            onClick={handleReturnToStore}
          >
            <ArrowLeft size={16} />
            <span>Ver Tienda Online</span>
          </button>
        </div>
      </aside>
    </>
  );
};
