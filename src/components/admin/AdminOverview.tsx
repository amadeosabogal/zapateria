import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, Clock, CheckCircle2, ArrowRight, Package } from 'lucide-react';
import { useApp } from '../../context/useApp';
import type { OrderStatus } from '../../types';

export const AdminOverview: React.FC = () => {
  const { sales, customers, products, setAdminTab, updateSaleStatus } = useApp();

  const totalRevenue = sales.reduce((sum, order) => {
    return order.status !== 'Cancelado' ? sum + order.total : sum;
  }, 0);

  const pendingCount = sales.filter(s => s.status === 'Pendiente').length;
  const completedCount = sales.filter(s => s.status === 'Completado').length;
  const shippedCount = sales.filter(s => s.status === 'Enviado').length;
  const vipCount = customers.filter(c => c.status === 'VIP').length;

  const averageTicket = sales.length > 0 ? (totalRevenue / (sales.length || 1)).toFixed(2) : '0.00';

  const recentOrders = sales.slice(0, 5);

  const getStatusBadgeClass = (status: OrderStatus) => {
    switch (status) {
      case 'Completado':
        return 'badge-status-completed';
      case 'Enviado':
        return 'badge-status-shipped';
      case 'Pendiente':
        return 'badge-status-pending';
      case 'Cancelado':
        return 'badge-status-cancelled';
      default:
        return '';
    }
  };

  return (
    <div className="admin-content-section">
      <div className="admin-page-header">
        <div>
          <h2>Resumen General</h2>
          <p className="admin-subtitle">Métricas clave del negocio y actividad reciente de ventas y clientes.</p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="btn-secondary"
            onClick={() => setAdminTab('inventory')}
          >
            <Package size={16} /> Inventario ({products.length})
          </button>
          <button 
            type="button" 
            className="btn-porto-primary"
            onClick={() => setAdminTab('sales')}
          >
            <ShoppingBag size={16} /> Ver Ventas
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="admin-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Ventas Totales</span>
            <div className="kpi-icon-wrapper bg-green-light">
              <DollarSign size={20} color="#1b4d3e" />
            </div>
          </div>
          <div className="kpi-value">S/ {totalRevenue.toFixed(2)}</div>
          <div className="kpi-footer text-positive">
            <TrendingUp size={14} /> +18.4% vs mes anterior
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Pedidos Totales</span>
            <div className="kpi-icon-wrapper bg-blue-light">
              <ShoppingBag size={20} color="#0284c7" />
            </div>
          </div>
          <div className="kpi-value">{sales.length}</div>
          <div className="kpi-footer text-muted">
            <Clock size={14} /> {pendingCount} pendientes por despachar
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Clientes Registrados</span>
            <div className="kpi-icon-wrapper bg-purple-light">
              <Users size={20} color="#7c3aed" />
            </div>
          </div>
          <div className="kpi-value">{customers.length}</div>
          <div className="kpi-footer text-positive">
            <CheckCircle2 size={14} /> {vipCount} clientes en categoría VIP
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Ticket Promedio</span>
            <div className="kpi-icon-wrapper bg-orange-light">
              <TrendingUp size={20} color="#d97706" />
            </div>
          </div>
          <div className="kpi-value">S/ {averageTicket}</div>
          <div className="kpi-footer text-muted">
            Por compra en Porto calzado
          </div>
        </div>
      </div>

      {/* Orders Breakdown Status Bar */}
      <div className="admin-card mb-30">
        <div className="admin-card-header">
          <h3>Distribución de Pedidos por Estado</h3>
        </div>
        <div className="order-stats-bar">
          <div className="status-pill status-pill-pending">
            <span className="pill-dot"></span>
            <strong>{pendingCount}</strong> Pendientes
          </div>
          <div className="status-pill status-pill-shipped">
            <span className="pill-dot"></span>
            <strong>{shippedCount}</strong> Enviados
          </div>
          <div className="status-pill status-pill-completed">
            <span className="pill-dot"></span>
            <strong>{completedCount}</strong> Completados
          </div>
          <div className="status-pill status-pill-cancelled">
            <span className="pill-dot"></span>
            <strong>{sales.filter(s => s.status === 'Cancelado').length}</strong> Cancelados
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Orders & Top Customers */}
      <div className="admin-two-columns">
        {/* Recent Orders */}
        <div className="admin-card">
          <div className="admin-card-header flex-between">
            <h3>Ventas y Pedidos Recientes</h3>
            <button 
              type="button" 
              className="btn-link"
              onClick={() => setAdminTab('sales')}
            >
              Ver todos <ArrowRight size={14} />
            </button>
          </div>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Cambiar Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <span className="order-id-tag">{order.orderNumber}</span>
                      <span className="order-date-small">{order.date.split(' ')[0]}</span>
                    </td>
                    <td>
                      <div className="table-user-cell">
                        <strong>{order.customerName}</strong>
                        <small>{order.customerCity}</small>
                      </div>
                    </td>
                    <td>
                      <strong>S/ {order.total.toFixed(2)}</strong>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <select
                        aria-label={`Cambiar estado de ${order.orderNumber}`}
                        className="status-quick-select"
                        value={order.status}
                        onChange={(e) => updateSaleStatus(order.id, e.target.value as OrderStatus)}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent / Top Customers */}
        <div className="admin-card">
          <div className="admin-card-header flex-between">
            <h3>Clientes Destacados</h3>
            <button 
              type="button" 
              className="btn-link"
              onClick={() => setAdminTab('customers')}
            >
              Ver todos <ArrowRight size={14} />
            </button>
          </div>
          <div className="customer-mini-list">
            {customers.slice(0, 5).map(cust => (
              <div key={cust.id} className="customer-mini-item">
                <div 
                  className="customer-avatar-circle"
                  style={{ backgroundColor: cust.avatarColor || '#222529' }}
                >
                  {cust.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="customer-mini-details">
                  <div className="customer-mini-name">
                    <strong>{cust.name}</strong>
                    {cust.status === 'VIP' && <span className="vip-tag">VIP</span>}
                  </div>
                  <span className="customer-mini-meta">{cust.city} • {cust.ordersCount} compras</span>
                </div>
                <div className="customer-mini-spent">
                  <span>Total gastado</span>
                  <strong>S/ {cust.totalSpent.toFixed(2)}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
