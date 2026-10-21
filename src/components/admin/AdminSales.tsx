import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Trash2, 
  X, 
  Printer, 
  Package, 
  Calendar, 
  CreditCard,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/useApp';
import type { SaleOrder, OrderStatus, SaleItem } from '../../types';

export const AdminSales: React.FC = () => {
  const { sales, customers, products, updateSaleStatus, addSale, deleteSale } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [selectedOrder, setSelectedOrder] = useState<SaleOrder | null>(null);
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);

  // New Sale Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || '');
  const [manualCustomerName, setManualCustomerName] = useState('');
  const [manualCustomerEmail, setManualCustomerEmail] = useState('');
  const [manualCustomerPhone, setManualCustomerPhone] = useState('');
  const [manualCustomerCity, setManualCustomerCity] = useState('Lima');
  const [manualCustomerAddress, setManualCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<SaleOrder['paymentMethod']>('Tarjeta de Crédito');
  const [orderNotes, setOrderNotes] = useState('');

  const allProducts = products;
  const [selectedProductId, setSelectedProductId] = useState<number>(allProducts[0]?.id || 1);
  const [selectedSize, setSelectedSize] = useState<number>(41);
  const [selectedQty, setSelectedQty] = useState<number>(1);

  const selectedProduct = allProducts.find(p => p.id === Number(selectedProductId)) || allProducts[0];
  const availableSizes = selectedProduct?.sizes || [
    { size: 38, stock: 2 },
    { size: 39, stock: 3 },
    { size: 40, stock: 4 },
    { size: 41, stock: 4 },
    { size: 42, stock: 2 },
    { size: 43, stock: 0 }
  ];
  const selectedSizeObj = availableSizes.find(s => s.size === selectedSize);
  const currentSizeStock = selectedSizeObj ? selectedSizeObj.stock : 0;
  const isOutOfStock = currentSizeStock <= 0;

  const handleProductChange = (prodId: number) => {
    setSelectedProductId(prodId);
    const prod = allProducts.find(p => p.id === prodId);
    if (prod && prod.sizes) {
      const firstAvailable = prod.sizes.find(s => s.stock > 0);
      if (firstAvailable) {
        setSelectedSize(firstAvailable.size);
      } else if (prod.sizes.length > 0) {
        setSelectedSize(prod.sizes[0].size);
      }
    }
    setSelectedQty(1);
  };



  // Filter sales
  const filteredSales = sales.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerCity.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'Todos' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  const handleCreateSale = (e: React.FormEvent) => {
    e.preventDefault();

    let client = customers.find(c => c.id === selectedCustomerId);
    let custName = client ? client.name : manualCustomerName;
    let custEmail = client ? client.email : manualCustomerEmail;
    let custPhone = client ? client.phone : manualCustomerPhone;
    let custCity = client ? client.city : manualCustomerCity;
    let custAddress = client ? client.address : manualCustomerAddress;

    if (!custName.trim()) {
      alert('Por favor selecciona o ingresa un cliente válido.');
      return;
    }

    const prod = allProducts.find(p => p.id === Number(selectedProductId)) || allProducts[0];
    const sizeStock = prod.sizes?.find(s => s.size === selectedSize)?.stock ?? 0;

    if (sizeStock <= 0) {
      alert(`⛔ No se puede registrar la venta: La talla ${selectedSize} del modelo "${prod.name}" no tiene existencias en stock (0 pares). Por favor selecciona una talla con stock o reabastece el inventario.`);
      return;
    }

    if (selectedQty > sizeStock) {
      alert(`⛔ Stock insuficiente: Solo dispones de ${sizeStock} pares de la talla ${selectedSize} para "${prod.name}".`);
      return;
    }

    const unitPrice = prod.numericPrice || 250;
    const itemTotal = unitPrice * selectedQty;


    const items: SaleItem[] = [
      {
        productId: prod.id,
        productName: prod.name,
        productImage: prod.image,
        size: selectedSize,
        quantity: selectedQty,
        unitPrice: unitPrice,
        subtotal: itemTotal
      }
    ];

    addSale({
      customerId: client ? client.id : '',
      customerName: custName,
      customerEmail: custEmail || 'cliente@porto.pe',
      customerPhone: custPhone || '+51 900 000 000',
      customerCity: custCity || 'Lima',
      customerAddress: custAddress || 'Entrega en tienda / Por coordinar',
      total: itemTotal,
      status: 'Pendiente',
      paymentMethod: paymentMethod,
      items: items,
      notes: orderNotes
    });

    setIsNewSaleModalOpen(false);
    // Reset inputs
    setOrderNotes('');
    setManualCustomerName('');
    setSelectedQty(1);
  };

  const handleDelete = (orderId: string, orderNumber: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el pedido ${orderNumber}? Esta acción no se puede deshacer.`)) {
      deleteSale(orderId);
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null);
      }
    }
  };

  return (
    <div className="admin-content-section">
      <div className="admin-page-header">
        <div>
          <h2>Gestión de Ventas y Pedidos</h2>
          <p className="admin-subtitle">
            Supervisa en tiempo real las órdenes de compra, pagos y estado de despacho de calzado.
          </p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="btn-porto-primary"
            onClick={() => setIsNewSaleModalOpen(true)}
          >
            <Plus size={16} /> Registrar Venta Manual
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por #pedido, cliente, ciudad o correo..."
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
            {['Todos', 'Pendiente', 'Enviado', 'Completado', 'Cancelado'].map(st => (
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

      {/* Sales Orders Table */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Pago</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.length === 0 ? (
                <tr>
                  <td colSpan={8} className="table-empty-state">
                    <Package size={40} />
                    <p>No se encontraron pedidos que coincidan con la búsqueda o filtro.</p>
                  </td>
                </tr>
              ) : (
                filteredSales.map(order => (
                  <tr key={order.id}>
                    <td>
                      <span className="order-id-tag">{order.orderNumber}</span>
                    </td>
                    <td>
                      <div className="order-date-col">
                        <span>{order.date.split(' ')[0]}</span>
                        <small>{order.date.split(' ')[1] || ''}</small>
                      </div>
                    </td>
                    <td>
                      <div className="table-user-cell">
                        <strong>{order.customerName}</strong>
                        <small>{order.customerCity} • {order.customerPhone}</small>
                      </div>
                    </td>
                    <td>
                      <div className="order-items-preview">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="item-thumb-wrapper" title={`${item.quantity}x ${item.productName} (Talla ${item.size || 'STD'})`}>
                            <img src={item.productImage} alt={item.productName} />
                            {item.quantity > 1 && <span className="item-qty-badge">{item.quantity}</span>}
                          </div>
                        ))}
                        <span className="items-text-summary">
                          {order.items.length} {order.items.length === 1 ? 'zapato' : 'zapatos'}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="payment-badge">
                        <CreditCard size={12} /> {order.paymentMethod}
                      </span>
                    </td>
                    <td>
                      <strong className="order-price-total">S/ {order.total.toFixed(2)}</strong>
                    </td>
                    <td>
                      <select 
                        aria-label={`Estado del pedido ${order.orderNumber}`}
                        className={`status-select ${getStatusBadgeClass(order.status)}`}
                        value={order.status}
                        onChange={(e) => updateSaleStatus(order.id, e.target.value as OrderStatus)}
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Completado">Completado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td>
                      <div className="table-actions-cell">
                        <button 
                          type="button" 
                          className="btn-action-icon" 
                          title="Ver detalle del pedido"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          type="button" 
                          className="btn-action-icon text-danger" 
                          title="Eliminar registro de venta"
                          onClick={() => handleDelete(order.id, order.orderNumber)}
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="modal-container order-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-supertitle">ORDEN DE COMPRA</div>
                <h3>{selectedOrder.orderNumber}</h3>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setSelectedOrder(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="order-detail-meta-grid">
                <div className="detail-meta-box">
                  <Calendar size={16} className="text-muted" />
                  <div>
                    <label>Fecha y Hora</label>
                    <strong>{selectedOrder.date}</strong>
                  </div>
                </div>

                <div className="detail-meta-box">
                  <CreditCard size={16} className="text-muted" />
                  <div>
                    <label>Método de Pago</label>
                    <strong>{selectedOrder.paymentMethod}</strong>
                  </div>
                </div>

                <div className="detail-meta-box">
                  <MapPin size={16} className="text-muted" />
                  <div>
                    <label>Destino</label>
                    <strong>{selectedOrder.customerCity}, Perú</strong>
                  </div>
                </div>

                <div className="detail-meta-box">
                  <label>Estado Actual</label>
                  <select 
                    aria-label="Estado actual del pedido"
                    className={`status-select ${getStatusBadgeClass(selectedOrder.status)}`}
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const newSt = e.target.value as OrderStatus;
                      updateSaleStatus(selectedOrder.id, newSt);
                      setSelectedOrder({ ...selectedOrder, status: newSt });
                    }}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Completado">Completado</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              {/* Customer Box */}
              <div className="order-customer-box">
                <h4>Información de Envío y Cliente</h4>
                <div className="customer-info-line">
                  <strong>Nombre:</strong> <span>{selectedOrder.customerName}</span>
                </div>
                <div className="customer-info-line">
                  <strong>Email:</strong> <span>{selectedOrder.customerEmail}</span>
                </div>
                <div className="customer-info-line">
                  <strong>Teléfono:</strong> <span>{selectedOrder.customerPhone}</span>
                </div>
                <div className="customer-info-line">
                  <strong>Dirección:</strong> <span>{selectedOrder.customerAddress}</span>
                </div>
                {selectedOrder.notes && (
                  <div className="customer-info-line notes-line">
                    <strong>Notas:</strong> <span>{selectedOrder.notes}</span>
                  </div>
                )}
              </div>

              {/* Products Breakdown */}
              <div className="order-items-table-wrapper">
                <h4>Detalle de Calzados Porto</h4>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Talla</th>
                      <th>Precio Unit.</th>
                      <th>Cantidad</th>
                      <th style={{ textAlign: 'right' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="order-item-desc">
                            <img src={item.productImage} alt={item.productName} />
                            <span>{item.productName}</span>
                          </div>
                        </td>
                        <td>{item.size || '41'}</td>
                        <td>S/ {item.unitPrice.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td style={{ textAlign: 'right', fontWeight: 700 }}>
                          S/ {item.subtotal.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'right', fontWeight: 600 }}>Envío:</td>
                      <td style={{ textAlign: 'right', color: '#1b4d3e', fontWeight: 600 }}>GRATIS</td>
                    </tr>
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'right', fontWeight: 800, fontSize: '16px' }}>TOTAL:</td>
                      <td style={{ textAlign: 'right', fontWeight: 800, fontSize: '18px', color: '#222529' }}>
                        S/ {selectedOrder.total.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => window.print()}
              >
                <Printer size={16} /> Imprimir Comprobante
              </button>
              <button 
                type="button" 
                className="btn-porto-primary" 
                onClick={() => setSelectedOrder(null)}
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Sale Modal */}
      {isNewSaleModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsNewSaleModalOpen(false)}>
          <div className="modal-container new-sale-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Registrar Nueva Venta Manual</h3>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setIsNewSaleModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateSale} className="new-sale-form">
              <div className="form-section-title">1. Seleccionar o Ingresar Cliente</div>
              
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="customer-select">Cliente Registrado</label>
                  <select
                    id="customer-select"
                    value={selectedCustomerId}
                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                  >
                    <option value="">-- Ingresar cliente manual nuevo --</option>
                    {customers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.city} - {c.phone})
                      </option>
                    ))}
                  </select>
                </div>

                {!selectedCustomerId && (
                  <>
                    <div className="form-group">
                      <label htmlFor="manual-cust-name">Nombre Completo *</label>
                      <input 
                        id="manual-cust-name"
                        type="text" 
                        required 
                        placeholder="Ej. Juan Pérez"
                        value={manualCustomerName}
                        onChange={(e) => setManualCustomerName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="manual-cust-email">Correo Electrónico</label>
                      <input 
                        id="manual-cust-email"
                        type="email" 
                        placeholder="juan.perez@gmail.com"
                        value={manualCustomerEmail}
                        onChange={(e) => setManualCustomerEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="manual-cust-phone">Teléfono / Celular</label>
                      <input 
                        id="manual-cust-phone"
                        type="tel" 
                        placeholder="+51 987 654 321"
                        value={manualCustomerPhone}
                        onChange={(e) => setManualCustomerPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="manual-cust-city">Ciudad</label>
                      <input 
                        id="manual-cust-city"
                        type="text" 
                        placeholder="Lima / Arequipa / Trujillo..."
                        value={manualCustomerCity}
                        onChange={(e) => setManualCustomerCity(e.target.value)}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label htmlFor="manual-cust-address">Dirección de Entrega</label>
                      <input 
                        id="manual-cust-address"
                        type="text" 
                        placeholder="Av. Principal 123, Urb. Los Robles"
                        value={manualCustomerAddress}
                        onChange={(e) => setManualCustomerAddress(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="form-section-title">2. Seleccionar Calzado</div>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="product-select">Modelo de Calzado Porto</label>
                  <select 
                    id="product-select"
                    value={selectedProductId}
                    onChange={(e) => handleProductChange(Number(e.target.value))}
                  >
                    {allProducts.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} - {p.price} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="shoe-size-select">Talla (EUR)</label>
                  <select 
                    id="shoe-size-select"
                    value={selectedSize}
                    onChange={(e) => {
                      setSelectedSize(Number(e.target.value));
                      setSelectedQty(1);
                    }}
                  >
                    {availableSizes.map(s => (
                      <option 
                        key={s.size} 
                        value={s.size}
                        disabled={s.stock <= 0}
                        style={s.stock <= 0 ? { color: '#dc2626', backgroundColor: '#fef2f2' } : {}}
                      >
                        Talla {s.size} {s.stock === 0 ? '— ⛔ AGOTADA (0 pares)' : `— (${s.stock} disponible${s.stock > 1 ? 's' : ''})`}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="shoe-qty-input">
                    Cantidad {currentSizeStock > 0 && <span style={{ color: '#059669', fontSize: '11px' }}>(Máx: {currentSizeStock})</span>}
                  </label>
                  <input 
                    id="shoe-qty-input"
                    type="number" 
                    min={1} 
                    max={Math.max(1, currentSizeStock)}
                    value={selectedQty}
                    disabled={isOutOfStock}
                    onChange={(e) => {
                      const val = Math.max(1, Number(e.target.value));
                      if (currentSizeStock > 0 && val > currentSizeStock) {
                        setSelectedQty(currentSizeStock);
                      } else {
                        setSelectedQty(val);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Out of Stock Alert Banner */}
              {isOutOfStock && (
                <div className="stock-validation-alert">
                  <AlertTriangle size={20} color="#b91c1c" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Talla {selectedSize} Agotada (0 pares en inventario)</strong>
                    <p>
                      El modelo "{selectedProduct?.name}" no cuenta con existencias para la talla {selectedSize}. 
                      Para evitar incumplir con el cliente, el sistema bloquea el registro hasta que reabastezcas el almacén desde <strong>Gestión de Inventario</strong> o selecciones una talla con stock disponible.
                    </p>
                  </div>
                </div>
              )}

              <div className="form-section-title">3. Pago y Observaciones</div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="payment-select">Método de Pago</label>
                  <select 
                    id="payment-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as SaleOrder['paymentMethod'])}
                  >
                    <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                    <option value="Yape / Plin">Yape / Plin</option>
                    <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Efectivo contra entrega">Efectivo contra entrega</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="sale-notes-input">Notas / Observaciones</label>
                  <input 
                    id="sale-notes-input"
                    type="text" 
                    placeholder="Instrucciones especiales de entrega..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Price Calculation preview */}
              <div className="new-sale-summary-box">
                <span>Total a cobrar:</span>
                <strong>
                  S/ {(((allProducts.find(p => p.id === selectedProductId)?.numericPrice || 250) * selectedQty)).toFixed(2)}
                </strong>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsNewSaleModalOpen(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-porto-primary"
                  disabled={isOutOfStock}
                  style={isOutOfStock ? { opacity: 0.5, cursor: 'not-allowed', backgroundColor: '#6b7280', borderColor: '#6b7280' } : {}}
                >
                  {isOutOfStock ? `Bloqueado: Talla ${selectedSize} Sin Stock` : 'Confirmar y Guardar Venta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
