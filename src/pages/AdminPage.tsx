import React from 'react';
import { useApp } from '../context/useApp';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminOverview } from '../components/admin/AdminOverview';
import { AdminSales } from '../components/admin/AdminSales';
import { AdminCustomers } from '../components/admin/AdminCustomers';
import { AdminInventory } from '../components/admin/AdminInventory';

export const AdminPage: React.FC = () => {
  const { adminTab } = useApp();

  return (
    <div className="admin-page-root">
      <AdminHeader />
      <div className="admin-main-layout">
        <AdminSidebar />
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
