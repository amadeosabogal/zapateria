import React, { useState, useEffect } from 'react';
import type { Customer, SaleOrder, OrderStatus, ViewMode, AdminTab, Product } from '../types';
import { initialCustomers, initialSales, initialAllProducts } from '../data/mockData';
import { AppContext, type Toast } from './AppContextDefinition';

const LOCAL_SALES_KEY = 'porto_sales_data';
const LOCAL_CUSTOMERS_KEY = 'porto_customers_data';
const LOCAL_PRODUCTS_KEY = 'porto_inventory_products';
const LOCAL_AUTH_KEY = 'porto_admin_auth';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('store');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(LOCAL_AUTH_KEY) === 'true';
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Initialize sales from localStorage or initial
  const [sales, setSales] = useState<SaleOrder[]>(() => {
    const saved = localStorage.getItem(LOCAL_SALES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved sales', e);
      }
    }
    return initialSales;
  });

  // Initialize customers from localStorage or initial
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(LOCAL_CUSTOMERS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved customers', e);
      }
    }
    return initialCustomers;
  });

  // Initialize products from localStorage or initial
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(LOCAL_PRODUCTS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved products', e);
      }
    }
    return initialAllProducts;
  });

  // Persist sales
  useEffect(() => {
    localStorage.setItem(LOCAL_SALES_KEY, JSON.stringify(sales));
  }, [sales]);

  // Persist customers
  useEffect(() => {
    localStorage.setItem(LOCAL_CUSTOMERS_KEY, JSON.stringify(customers));
  }, [customers]);

  // Persist products
  useEffect(() => {
    localStorage.setItem(LOCAL_PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  // Persist auth
  useEffect(() => {
    localStorage.setItem(LOCAL_AUTH_KEY, isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now();
    setToast({ id, text, type });
    setTimeout(() => {
      setToast(current => (current?.id === id ? null : current));
    }, 3500);
  };

  const loginAsAdmin = () => {
    setIsAdmin(true);
    setIsAuthModalOpen(false);
    setViewMode('admin');
    showToast('¡Bienvenido al Panel Administrativo de Porto!', 'success');
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setViewMode('store');
    showToast('Sesión de administrador cerrada.', 'info');
  };

  const enterAdminPanel = () => {
    if (isAdmin) {
      setViewMode('admin');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const goToStore = () => {
    setViewMode('store');
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  // Sales functions
  const updateSaleStatus = (orderId: string, newStatus: OrderStatus) => {
    const existingOrder = sales.find(o => o.id === orderId);
    
    // If order was active and is being cancelled, restore stock
    if (existingOrder && existingOrder.status !== 'Cancelado' && newStatus === 'Cancelado') {
      existingOrder.items.forEach(item => {
        const itemSize = Number(item.size);
        setProducts(prev =>
          prev.map(p => {
            if (p.id !== item.productId) return p;
            const updatedSizes = (p.sizes || []).map(s =>
              s.size === itemSize ? { ...s, stock: s.stock + item.quantity } : s
            );
            const totalStock = updatedSizes.reduce((acc, c) => acc + c.stock, 0);
            return { ...p, sizes: updatedSizes, stock: totalStock };
          })
        );
      });
      showToast(`Pedido cancelado y stock de calzado restablecido`, 'info');
    } 
    // If order was cancelled and is being reactivated, deduct stock again
    else if (existingOrder && existingOrder.status === 'Cancelado' && newStatus !== 'Cancelado') {
      existingOrder.items.forEach(item => {
        const itemSize = Number(item.size);
        setProducts(prev =>
          prev.map(p => {
            if (p.id !== item.productId) return p;
            const updatedSizes = (p.sizes || []).map(s =>
              s.size === itemSize ? { ...s, stock: Math.max(0, s.stock - item.quantity) } : s
            );
            const totalStock = updatedSizes.reduce((acc, c) => acc + c.stock, 0);
            return { ...p, sizes: updatedSizes, stock: totalStock };
          })
        );
      });
      showToast(`Pedido reactivado y stock descontado`, 'success');
    } else {
      showToast(`Pedido actualizado a estado: "${newStatus}"`, 'success');
    }

    setSales(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const addSale = (saleData: Omit<SaleOrder, 'id' | 'orderNumber' | 'date'>) => {
    const nextNum = 1083 + sales.length;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newOrder: SaleOrder = {
      ...saleData,
      id: `ord-${nextNum}`,
      orderNumber: `PRT-${nextNum}`,
      date: formattedDate
    };

    setSales(prev => [newOrder, ...prev]);

    // Automatically deduct stock for each purchased item
    saleData.items.forEach(item => {
      const itemSize = Number(item.size);
      setProducts(prev =>
        prev.map(p => {
          if (p.id !== item.productId) return p;
          const updatedSizes = (p.sizes || []).map(s =>
            s.size === itemSize ? { ...s, stock: Math.max(0, s.stock - item.quantity) } : s
          );
          const totalStock = updatedSizes.reduce((acc, c) => acc + c.stock, 0);
          return {
            ...p,
            sizes: updatedSizes,
            stock: totalStock
          };
        })
      );
    });

    // Update customer stats if customer exists
    if (saleData.customerId) {
      setCustomers(prev =>
        prev.map(c =>
          c.id === saleData.customerId
            ? {
                ...c,
                ordersCount: c.ordersCount + 1,
                totalSpent: c.totalSpent + saleData.total,
                lastOrderDate: formattedDate.split(' ')[0]
              }
            : c
        )
      );
    }

    showToast(`Venta #${newOrder.orderNumber} registrada y stock descontado`, 'success');
  };

  const deleteSale = (orderId: string) => {
    const orderToDelete = sales.find(s => s.id === orderId);
    if (orderToDelete && orderToDelete.status !== 'Cancelado') {
      // Restore stock when deleting an active sale
      orderToDelete.items.forEach(item => {
        const itemSize = Number(item.size);
        setProducts(prev =>
          prev.map(p => {
            if (p.id !== item.productId) return p;
            const updatedSizes = (p.sizes || []).map(s =>
              s.size === itemSize ? { ...s, stock: s.stock + item.quantity } : s
            );
            const totalStock = updatedSizes.reduce((acc, c) => acc + c.stock, 0);
            return { ...p, sizes: updatedSizes, stock: totalStock };
          })
        );
      });
    }

    setSales(prev => prev.filter(s => s.id !== orderId));
    showToast('Pedido eliminado y existencias actualizadas', 'info');
  };

  // Customers functions
  const addCustomer = (customerData: Omit<Customer, 'id' | 'ordersCount' | 'totalSpent' | 'lastOrderDate' | 'createdAt'>) => {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const newId = `cust-${Date.now().toString().slice(-4)}`;

    const colors = ['#222529', '#8b5e3c', '#1b4d3e', '#7c3aed', '#0284c7', '#d97706'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newCust: Customer = {
      ...customerData,
      id: newId,
      ordersCount: 0,
      totalSpent: 0,
      lastOrderDate: 'Sin compras',
      createdAt: today,
      avatarColor: randomColor
    };

    setCustomers(prev => [newCust, ...prev]);
    showToast(`Cliente ${newCust.name} agregado correctamente`, 'success');
  };

  const updateCustomer = (updated: Customer) => {
    setCustomers(prev =>
      prev.map(c => (c.id === updated.id ? updated : c))
    );
    showToast(`Datos del cliente actualizados`, 'success');
  };

  const deleteCustomer = (customerId: string) => {
    setCustomers(prev => prev.filter(c => c.id !== customerId));
    showToast('Cliente eliminado', 'info');
  };

  // Inventory / Products functions
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    // Calculate total stock from sizes if provided
    const totalStock = prodData.sizes 
      ? prodData.sizes.reduce((acc, curr) => acc + curr.stock, 0)
      : prodData.stock || 0;

    const newProduct: Product = {
      ...prodData,
      id: newId,
      stock: totalStock
    };

    setProducts(prev => [newProduct, ...prev]);
    showToast(`Modelo "${newProduct.name}" agregado al inventario`, 'success');
  };

  const updateProduct = (updated: Product) => {
    const totalStock = updated.sizes 
      ? updated.sizes.reduce((acc, curr) => acc + curr.stock, 0)
      : updated.stock || 0;

    const finalProduct = {
      ...updated,
      stock: totalStock
    };

    setProducts(prev =>
      prev.map(p => (p.id === updated.id ? finalProduct : p))
    );
    showToast(`Calzado "${updated.name}" actualizado en inventario`, 'success');
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Producto eliminado del catálogo', 'info');
  };

  const updateProductStock = (productId: number, size: number, newStock: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const updatedSizes = (p.sizes || []).map(s =>
          s.size === size ? { ...s, stock: Math.max(0, newStock) } : s
        );
        const total = updatedSizes.reduce((acc, curr) => acc + curr.stock, 0);
        return {
          ...p,
          sizes: updatedSizes,
          stock: total
        };
      })
    );
    showToast(`Stock talla ${size} actualizado a ${newStock} pares`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        adminTab,
        isAdmin,
        isAuthModalOpen,
        sales,
        customers,
        products,
        toast,
        setViewMode,
        setAdminTab,
        openAuthModal,
        closeAuthModal,
        loginAsAdmin,
        logoutAdmin,
        enterAdminPanel,
        goToStore,
        updateSaleStatus,
        addSale,
        deleteSale,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStock,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
