import React, { useState } from 'react';
import { useApp } from '../context/useApp';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminOverview } from '../components/admin/AdminOverview';
import { AdminSales } from '../components/admin/AdminSales';
import { AdminCustomers } from '../components/admin/AdminCustomers';
import { AdminInventory } from '../components/admin/AdminInventory';
import { LayoutDashboard, Package, ShoppingBag, Users } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { adminTab, setAdminTab, products, sales } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingCount = sales.filter(s => s.status === 'Pendiente').length;

  return (
    <div className="admin-page-root">
      <AdminHeader 
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Mobile Quick Tab Bar for instant 1-tap switching on phones */}
      <nav className="admin-mobile-quick-tabs" aria-label="Navegación rápida móvil">
        <button
          type="button"
          className={`mobile-quick-tab ${adminTab === 'overview' ? 'active' : ''}`}
          onClick={() => setAdminTab('overview')}
        >
          <LayoutDashboard size={15} />
          <span>Inicio</span>
        </button>

        <button
          type="button"
          className={`mobile-quick-tab ${adminTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setAdminTab('inventory')}
        >
          <Package size={15} />
          <span>Inventario</span>
          <span className="mobile-tab-badge">{products.length}</span>
        </button>

        <button
          type="button"
          className={`mobile-quick-tab ${adminTab === 'sales' ? 'active' : ''}`}
          onClick={() => setAdminTab('sales')}
        >
          <ShoppingBag size={15} />
          <span>Ventas</span>
          {pendingCount > 0 && <span className="mobile-tab-badge alert">{pendingCount}</span>}
        </button>

        <button
          type="button"
          className={`mobile-quick-tab ${adminTab === 'customers' ? 'active' : ''}`}
          onClick={() => setAdminTab('customers')}
        >
          <Users size={15} />
          <span>Clientes</span>
        </button>
      </nav>

      <div className="admin-main-layout">
        <AdminSidebar 
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />
        <main className="admin-main-viewport">
          {adminTab === 'overview' && <AdminOverview />}
          {adminTab === 'inventory' && <AdminInventory />}
          {adminTab === 'sales' && <AdminSales />}
          {adminTab === 'customers' && <AdminCustomers />}
        </main>
      </div>
    </div>
  );
};
