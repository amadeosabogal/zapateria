import { createContext } from 'react';
import type { Customer, SaleOrder, OrderStatus, ViewMode, AdminTab, Product } from '../types';

export interface Toast {
  id: number;
  text: string;
  type: 'success' | 'info' | 'warning';
}

export interface AppContextType {
  viewMode: ViewMode;
  adminTab: AdminTab;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  sales: SaleOrder[];
  customers: Customer[];
  products: Product[];
  toast: Toast | null;
  // Navigation & Auth actions
  setViewMode: (mode: ViewMode) => void;
  setAdminTab: (tab: AdminTab) => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  loginAsAdmin: () => void;
  logoutAdmin: () => void;
  enterAdminPanel: () => void;
  goToStore: () => void;
  // Sales CRUD
  updateSaleStatus: (orderId: string, newStatus: OrderStatus) => void;
  addSale: (newSale: Omit<SaleOrder, 'id' | 'orderNumber' | 'date'>) => void;
  deleteSale: (orderId: string) => void;
  // Customers CRUD
  addCustomer: (customer: Omit<Customer, 'id' | 'ordersCount' | 'totalSpent' | 'lastOrderDate' | 'createdAt'>) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (customerId: string) => void;
  // Inventory / Products CRUD
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;
  updateProductStock: (productId: number, size: number, newStock: number) => void;
  // Feedback
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
