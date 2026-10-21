import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  ShoppingBag, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Award,
  Users
} from 'lucide-react';
import { useApp } from '../../context/useApp';
import type { Customer, CustomerStatus } from '../../types';

export const AdminCustomers: React.FC = () => {
  const { customers, sales, addCustomer, updateCustomer, deleteCustomer } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');

  // Modals state
  const [isNewCustomerModalOpen, setIsNewCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewHistoryCustomer, setViewHistoryCustomer] = useState<Customer | null>(null);

  // New Customer Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('Lima');
  const [newAddress, setNewAddress] = useState('');
  const [newStatus, setNewStatus] = useState<CustomerStatus>('Activo');

  // Filtered customers
  const filteredCustomers = customers.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'Todos' || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      alert('Nombre y correo electrónico son obligatorios.');
      return;
    }

    addCustomer({
      name: newName,
      email: newEmail,
      phone: newPhone || '+51 900 000 000',
      city: newCity || 'Lima',
      address: newAddress || 'Lima, Perú',
      status: newStatus
    });

    setIsNewCustomerModalOpen(false);
    // Reset
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewAddress('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;

    updateCustomer(editingCustomer);
    setEditingCustomer(null);
  };

  const handleDelete = (customerId: string, customerName: string) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${customerName}? Esta acción borrará el registro del cliente.`)) {
      deleteCustomer(customerId);
    }
  };

  // Get orders of customer
  const getCustomerOrders = (customer: Customer) => {
    return sales.filter(s => s.customerId === customer.id || s.customerEmail === customer.email);
  };

  const getStatusBadge = (status: CustomerStatus) => {
    switch (status) {
      case 'VIP':
        return <span className="customer-status-badge badge-vip"><Award size={12} /> VIP</span>;
      case 'Activo':
        return <span className="customer-status-badge badge-active">Activo</span>;
      case 'Inactivo':
        return <span className="customer-status-badge badge-inactive">Inactivo</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="admin-content-section">
      <div className="admin-page-header">
        <div>
          <h2>Gestión de Clientes</h2>
          <p className="admin-subtitle">
            Base de datos, compras históricas y fidelización de compradores de calzado Porto.
          </p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="btn-porto-primary"
            onClick={() => setIsNewCustomerModalOpen(true)}
          >
            <Plus size={16} /> + Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Customer summary cards */}
      <div className="customer-stats-row">
        <div className="customer-stat-card">
          <div className="stat-label">Total Clientes</div>
          <div className="stat-number">{customers.length}</div>
        </div>
        <div className="customer-stat-card">
          <div className="stat-label">Clientes VIP</div>
          <div className="stat-number text-gold">
            {customers.filter(c => c.status === 'VIP').length}
          </div>
        </div>
        <div className="customer-stat-card">
          <div className="stat-label">Clientes Activos</div>
          <div className="stat-number text-green">
            {customers.filter(c => c.status === 'Activo').length}
          </div>
        </div>
        <div className="customer-stat-card">
          <div className="stat-label">Gasto Total Acumulado</div>
          <div className="stat-number">
            S/ {customers.reduce((acc, c) => acc + c.totalSpent, 0).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, correo, teléfono o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              type="button" 
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-group">
          <Filter size={16} className="filter-icon" />
          <span className="filter-label">Estado:</span>
          <div className="filter-buttons">
            {['Todos', 'VIP', 'Activo', 'Inactivo'].map(st => (
              <button
                key={st}
                type="button"
                className={`filter-btn ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Contacto</th>
                <th>Ubicación</th>
                <th>Pedidos</th>
                <th>Total Invertido</th>
                <th>Última Compra</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="table-empty-state">
                    <Users size={40} />
                    <p>No se encontraron clientes con los filtros seleccionados.</p>
                  </td>
                </tr>
              ) : (
                filteredCustomers.map(customer => (
                  <tr key={customer.id}>
                    <td>
                      <div className="customer-name-cell">
                        <div 
                          className="customer-avatar-circle"
                          style={{ backgroundColor: customer.avatarColor || '#222529' }}
                        >
                          {customer.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <strong>{customer.name}</strong>
                          <span className="customer-since">Registro: {customer.createdAt}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-details-cell">
                        <span><Mail size={12} /> {customer.email}</span>
                        <span><Phone size={12} /> {customer.phone}</span>
                      </div>
                    </td>
                    <td>
                      <div className="location-details-cell">
                        <strong><MapPin size={12} /> {customer.city}</strong>
                        <small title={customer.address}>{customer.address}</small>
                      </div>
                    </td>
                    <td>
                      <span className="orders-badge">{customer.ordersCount} compras</span>
                    </td>
                    <td>
                      <strong className="order-price-total">
                        S/ {customer.totalSpent.toFixed(2)}
                      </strong>
                    </td>
                    <td>
                      <span className="last-order-date">
                        <Calendar size={12} /> {customer.lastOrderDate}
                      </span>
                    </td>
                    <td>
                      {getStatusBadge(customer.status)}
                    </td>
                    <td>
                      <div className="table-actions-cell">
                        <button 
                          type="button" 
                          className="btn-action-icon" 
                          title="Ver historial de pedidos"
                          onClick={() => setViewHistoryCustomer(customer)}
                        >
                          <ShoppingBag size={16} />
                        </button>
                        <button 
                          type="button" 
                          className="btn-action-icon" 
                          title="Editar datos del cliente"
                          onClick={() => setEditingCustomer(customer)}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          type="button" 
                          className="btn-action-icon text-danger" 
                          title="Eliminar cliente"
                          onClick={() => handleDelete(customer.id, customer.name)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Customer Modal */}
      {isNewCustomerModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsNewCustomerModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Agregar Nuevo Cliente</h3>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setIsNewCustomerModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="customer-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="new-customer-name">Nombre Completo *</label>
                  <input 
                    id="new-customer-name"
                    type="text" 
                    required 
                    placeholder="Ej. Martín Valverde"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-customer-email">Correo Electrónico *</label>
                  <input 
                    id="new-customer-email"
                    type="email" 
                    required 
                    placeholder="martin.valverde@correo.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-customer-phone">Teléfono / Celular</label>
                  <input 
                    id="new-customer-phone"
                    type="tel" 
                    placeholder="+51 987 654 321"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-customer-city">Ciudad</label>
                  <input 
                    id="new-customer-city"
                    type="text" 
                    placeholder="Lima, Trujillo, Arequipa..."
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-customer-status">Estado del Cliente</label>
                  <select 
                    id="new-customer-status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as CustomerStatus)}
                  >
                    <option value="Activo">Activo</option>
                    <option value="VIP">VIP</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="new-customer-address">Dirección de Entrega</label>
                  <input 
                    id="new-customer-address"
                    type="text" 
                    placeholder="Av. Pardo 650, Dpto 802, Miraflores"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsNewCustomerModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-porto-primary">
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <div className="modal-backdrop" onClick={() => setEditingCustomer(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Editar Información del Cliente</h3>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setEditingCustomer(null)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="customer-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="edit-customer-name">Nombre Completo</label>
                  <input 
                    id="edit-customer-name"
                    type="text" 
                    required 
                    value={editingCustomer.name}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-customer-email">Correo Electrónico</label>
                  <input 
                    id="edit-customer-email"
                    type="email" 
                    required 
                    value={editingCustomer.email}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-customer-phone">Teléfono</label>
                  <input 
                    id="edit-customer-phone"
                    type="tel" 
                    value={editingCustomer.phone}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-customer-city">Ciudad</label>
                  <input 
                    id="edit-customer-city"
                    type="text" 
                    value={editingCustomer.city}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, city: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-customer-status">Estado</label>
                  <select 
                    id="edit-customer-status"
                    value={editingCustomer.status}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, status: e.target.value as CustomerStatus })}
                  >
                    <option value="Activo">Activo</option>
                    <option value="VIP">VIP</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="edit-customer-address">Dirección</label>
                  <input 
                    id="edit-customer-address"
                    type="text" 
                    value={editingCustomer.address}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, address: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setEditingCustomer(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-porto-primary">
                  Actualizar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Orders History Modal */}
      {viewHistoryCustomer && (
        <div className="modal-backdrop" onClick={() => setViewHistoryCustomer(null)}>
          <div className="modal-container customer-history-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-supertitle">HISTORIAL DE COMPRAS</div>
                <h3>{viewHistoryCustomer.name}</h3>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setViewHistoryCustomer(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="customer-history-meta">
                <div>
                  <label>Email:</label> <span>{viewHistoryCustomer.email}</span>
                </div>
                <div>
                  <label>Teléfono:</label> <span>{viewHistoryCustomer.phone}</span>
                </div>
                <div>
                  <label>Ciudad:</label> <span>{viewHistoryCustomer.city}</span>
                </div>
                <div>
                  <label>Total Invertido:</label> <strong>S/ {viewHistoryCustomer.totalSpent.toFixed(2)}</strong>
                </div>
              </div>

              <h4>Pedidos Registrados</h4>
              {getCustomerOrders(viewHistoryCustomer).length === 0 ? (
                <div className="empty-history-box">
                  <ShoppingBag size={32} color="#999" />
                  <p>Este cliente aún no tiene pedidos registrados en el sistema.</p>
                </div>
              ) : (
                <div className="history-orders-list">
                  {getCustomerOrders(viewHistoryCustomer).map(order => (
                    <div key={order.id} className="history-order-card">
                      <div className="history-order-top">
                        <span className="order-id-tag">{order.orderNumber}</span>
                        <span className="order-date-small">{order.date}</span>
                        <span className="history-order-status">{order.status}</span>
                      </div>
                      <div className="history-order-items">
                        {order.items.map((it, i) => (
                          <div key={i} className="history-item-row">
                            <img src={it.productImage} alt={it.productName} />
                            <div className="history-item-text">
                              <strong>{it.productName}</strong>
                              <small>Talla {it.size || 41} • Cantidad: {it.quantity} • S/ {it.subtotal.toFixed(2)}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="history-order-footer">
                        <span>Pago: {order.paymentMethod}</span>
                        <strong>Total: S/ {order.total.toFixed(2)}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn-porto-primary"
                onClick={() => setViewHistoryCustomer(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
