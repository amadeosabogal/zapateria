import React from 'react';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/useApp';
import { StorePage } from './pages/StorePage';
import { AdminPage } from './pages/AdminPage';
import { AdminAuthModal } from './components/store/AdminAuthModal';
import { AdminToast } from './components/admin/AdminToast';

const AppContent: React.FC = () => {
  const { viewMode } = useApp();

  return (
    <>
      {viewMode === 'admin' ? <AdminPage /> : <StorePage />}
      <AdminAuthModal />
      <AdminToast />
    </>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
