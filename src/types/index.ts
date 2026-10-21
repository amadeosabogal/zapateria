export interface ProductSizeStock {
  size: number;
  stock: number;
}

export interface Product {
  id: number;
  sku?: string;
  name: string;
  category: string;
  price: string;
  numericPrice?: number;
  oldPrice?: string;
  image: string;
  badge?: string;
  countdown?: string;
  rating?: number;
  stock?: number;
  material?: string;
  sole?: string;
  sizes?: ProductSizeStock[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
}

export interface SaleItem {
  productId: number;
  productName: string;
  productImage: string;
  size?: number | string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type OrderStatus = 'Pendiente' | 'Enviado' | 'Completado' | 'Cancelado';

export interface SaleOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string;
  customerAddress: string;
  date: string;
  total: number;
  status: OrderStatus;
  paymentMethod: 'Tarjeta de Crédito' | 'Yape / Plin' | 'Transferencia Bancaria' | 'PayPal' | 'Efectivo contra entrega';
  items: SaleItem[];
  notes?: string;
}

export type CustomerStatus = 'Activo' | 'VIP' | 'Inactivo';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  status: CustomerStatus;
  avatarColor?: string;
  createdAt: string;
}

export type ViewMode = 'store' | 'admin';
export type AdminTab = 'overview' | 'sales' | 'customers' | 'inventory';
