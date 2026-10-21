import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign,
  Package,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useApp } from '../../context/useApp';
import type { Product, ProductSizeStock } from '../../types';

export const AdminInventory: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, updateProductStock } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [stockFilter, setStockFilter] = useState('Todos');

  // Modals state
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [adjustStockProduct, setAdjustStockProduct] = useState<Product | null>(null);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newCategory, setNewCategory] = useState('HOMBRE, FORMAL');
  const [newPrice, setNewPrice] = useState('280.00');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newImage, setNewImage] = useState('/shoes/1.png');
  const [newBadge, setNewBadge] = useState('');
  const [newMaterial, setNewMaterial] = useState('Cuero vacuno genuino');
  const [newSole, setNewSole] = useState('Neolite antideslizante con vira cosida');

  // Initial size distribution for new shoe
  const [newSizes, setNewSizes] = useState<ProductSizeStock[]>([
    { size: 38, stock: 2 },
    { size: 39, stock: 3 },
    { size: 40, stock: 5 },
    { size: 41, stock: 4 },
    { size: 42, stock: 2 },
    { size: 43, stock: 1 }
  ]);

  // Inventory KPI calculations
  const totalModels = products.length;
  const totalPairsInStock = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const lowStockCount = products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) < 10).length;
  const outOfStockCount = products.filter(p => (p.stock || 0) === 0).length;
  const totalInventoryValue = products.reduce((acc, p) => {
    const price = p.numericPrice || 250;
    return acc + (price * (p.stock || 0));
  }, 0);

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.material && product.material.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = 
      categoryFilter === 'Todos' || 
      product.category.toLowerCase().includes(categoryFilter.toLowerCase());

    const stock = product.stock || 0;
    let matchesStock = true;
    if (stockFilter === 'En Stock') matchesStock = stock >= 10;
    if (stockFilter === 'Poco Stock') matchesStock = stock > 0 && stock < 10;
    if (stockFilter === 'Agotado') matchesStock = stock === 0;

    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert('Ingresa el nombre del modelo.');
      return;
    }

    const numericPrice = parseFloat(newPrice) || 250;
    const finalSku = newSku.trim() || `PRT-${Date.now().toString().slice(-4)}`;

    addProduct({
      name: newName,
      sku: finalSku,
      category: newCategory,
      price: `S/ ${numericPrice.toFixed(2)}`,
      numericPrice: numericPrice,
      oldPrice: newOldPrice ? `S/ ${parseFloat(newOldPrice).toFixed(2)}` : undefined,
      image: newImage,
      badge: newBadge.trim() ? newBadge.trim() : undefined,
      material: newMaterial,
      sole: newSole,
      sizes: newSizes,
      rating: 5
    });

    setIsNewModalOpen(false);
    // Reset
    setNewName('');
    setNewSku('');
    setNewOldPrice('');
    setNewBadge('');
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const numericPrice = editingProduct.numericPrice || parseFloat(editingProduct.price.replace(/[^\d.]/g, '')) || 250;
    const updated: Product = {
      ...editingProduct,
      numericPrice: numericPrice,
      price: `S/ ${numericPrice.toFixed(2)}`
    };

    updateProduct(updated);
    setEditingProduct(null);
  };

  const handleDelete = (productId: number, productName: string) => {
    if (window.confirm(`¿Estás seguro de eliminar el modelo "${productName}" del catálogo de la zapatería?`)) {
      deleteProduct(productId);
    }
  };

  const handleUpdateSizeStockInline = (productId: number, size: number, currentStock: number, delta: number) => {
    const nextStock = Math.max(0, currentStock + delta);
    updateProductStock(productId, size, nextStock);
    if (adjustStockProduct && adjustStockProduct.id === productId) {
      setAdjustStockProduct({
        ...adjustStockProduct,
        sizes: (adjustStockProduct.sizes || []).map(s =>
          s.size === size ? { ...s, stock: nextStock } : s
        )
      });
    }
  };

  const getStockStatusBadge = (stock: number) => {
    if (stock === 0) {
      return <span className="stock-pill stock-pill-out">Agotado (0)</span>;
    }
    if (stock < 10) {
      return <span className="stock-pill stock-pill-low">Poco Stock ({stock})</span>;
    }
    return <span className="stock-pill stock-pill-good">En Stock ({stock})</span>;
  };

  return (
    <div className="admin-content-section">
      <div className="admin-page-header">
        <div>
          <h2>Gestión de Inventario y Catálogo</h2>
          <p className="admin-subtitle">
            Control centralizado de modelos de calzado, curvas de tallas, stock en almacén y precios.
          </p>
        </div>
        <div className="header-actions">
          <button 
            type="button" 
            className="btn-porto-primary"
            onClick={() => setIsNewModalOpen(true)}
          >
            <Plus size={16} /> + Nuevo Calzado
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="admin-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Modelos en Catálogo</span>
            <div className="kpi-icon-wrapper bg-blue-light">
              <Package size={20} color="#0284c7" />
            </div>
          </div>
          <div className="kpi-value">{totalModels}</div>
          <div className="kpi-footer text-muted">
            Modelos de calzado activos
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Pares en Stock Total</span>
            <div className="kpi-icon-wrapper bg-green-light">
              <Layers size={20} color="#1b4d3e" />
            </div>
          </div>
          <div className="kpi-value">{totalPairsInStock}</div>
          <div className="kpi-footer text-positive">
            <CheckCircle2 size={14} /> Suma de todas las tallas
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Alertas de Stock</span>
            <div className="kpi-icon-wrapper bg-orange-light">
              <AlertTriangle size={20} color="#d97706" />
            </div>
          </div>
          <div className="kpi-value">{lowStockCount + outOfStockCount}</div>
          <div className="kpi-footer text-muted">
            {lowStockCount} por agotarse • {outOfStockCount} agotados
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Valor en Almacén</span>
            <div className="kpi-icon-wrapper bg-purple-light">
              <DollarSign size={20} color="#7c3aed" />
            </div>
          </div>
          <div className="kpi-value">S/ {totalInventoryValue.toFixed(2)}</div>
          <div className="kpi-footer text-muted">
            Valoración total inventario
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-filter-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, SKU, categoría o material de cuero..."
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
          <span className="filter-label">Categoría:</span>
          <div className="filter-buttons">
            {['Todos', 'Formal', 'Moda'].map(cat => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${categoryFilter === cat ? 'active' : ''}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Stock:</span>
          <div className="filter-buttons">
            {['Todos', 'En Stock', 'Poco Stock', 'Agotado'].map(st => (
              <button
                key={st}
                type="button"
                className={`filter-btn ${stockFilter === st ? 'active' : ''}`}
                onClick={() => setStockFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Products Table */}
      <div className="admin-card">
        <div className="table-responsive">
          <table className="admin-table inventory-table">
            <thead>
              <tr>
                <th>Calzado</th>
                <th>SKU</th>
                <th>Material & Suela</th>
                <th>Curva de Tallas & Stock</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="table-empty-state">
                    <Package size={40} />
                    <p>No se encontraron calzados con los filtros aplicados.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="inventory-product-cell">
                        <div className="inventory-thumb-box">
                          <img src={product.image} alt={product.name} />
                          {product.badge && <span className="product-mini-badge">{product.badge}</span>}
                        </div>
                        <div className="inventory-product-info">
                          <strong>{product.name}</strong>
                          <span className="inventory-cat-tag">{product.category}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="sku-tag">{product.sku || `PRT-00${product.id}`}</span>
                    </td>
                    <td>
                      <div className="material-cell">
                        <strong title={product.material}>{product.material || 'Cuero vacuno genuino'}</strong>
                        <small title={product.sole}>{product.sole || 'Neolite antideslizante'}</small>
                      </div>
                    </td>
                    <td>
                      {/* Size Matrix Display */}
                      <div className="size-matrix-container">
                        <div className="size-pills-row">
                          {(product.sizes && product.sizes.length > 0) ? (
                            product.sizes.map(s => (
                              <div 
                                key={s.size} 
                                className={`size-pill-item ${s.stock === 0 ? 'size-out' : s.stock < 3 ? 'size-low' : ''}`}
                                title={`Talla ${s.size}: ${s.stock} pares en almacén`}
                              >
                                <span className="size-number">T{s.size}</span>
                                <span className="size-stock">{s.stock}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-muted" style={{ fontSize: '11px' }}>
                              Tallas estándar (38-43)
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          className="btn-quick-adjust-size"
                          onClick={() => setAdjustStockProduct(product)}
                          title="Ajustar stock por tallas"
                        >
                          <Sliders size={12} /> Ajustar Stock
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="inventory-price-cell">
                        <strong>{product.price}</strong>
                        {product.oldPrice && <del>{product.oldPrice}</del>}
                      </div>
                    </td>
                    <td>
                      {getStockStatusBadge(product.stock || 0)}
                    </td>
                    <td>
                      <div className="table-actions-cell">
                        <button 
                          type="button" 
                          className="btn-action-icon" 
                          title="Ajustar stock por tallas"
                          onClick={() => setAdjustStockProduct(product)}
                        >
                          <Sliders size={16} />
                        </button>
                        <button 
                          type="button" 
                          className="btn-action-icon" 
                          title="Editar información del calzado"
                          onClick={() => setEditingProduct(product)}
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          type="button" 
                          className="btn-action-icon text-danger" 
                          title="Eliminar modelo"
                          onClick={() => handleDelete(product.id, product.name)}
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

      {/* Modal: New Shoe Model */}
      {isNewModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsNewModalOpen(false)}>
          <div className="modal-container inventory-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-supertitle">CATÁLOGO PORTO</div>
                <h3>Registrar Nuevo Calzado</h3>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setIsNewModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="inventory-form">
              <div className="form-section-title">1. Datos Principales del Modelo</div>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="new-shoe-name">Nombre del Calzado *</label>
                  <input 
                    id="new-shoe-name"
                    type="text" 
                    required 
                    placeholder="Ej. Oxford Cap Toe Coñac"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-shoe-sku">Código SKU / Referencia</label>
                  <input 
                    id="new-shoe-sku"
                    type="text" 
                    placeholder="Ej. OXF-COC-08"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-shoe-cat">Categoría</label>
                  <select 
                    id="new-shoe-cat"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    <option value="HOMBRE, FORMAL">Hombre, Formal</option>
                    <option value="MODA, HOMBRE">Moda, Hombre</option>
                    <option value="HOMBRE, CASUAL">Hombre, Casual</option>
                    <option value="COLECCIÓN VERANO">Colección Verano</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="new-shoe-price">Precio de Venta (S/) *</label>
                  <input 
                    id="new-shoe-price"
                    type="number" 
                    step="0.01" 
                    required 
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-shoe-oldprice">Precio Regular / Tachado (S/)</label>
                  <input 
                    id="new-shoe-oldprice"
                    type="number" 
                    step="0.01" 
                    placeholder="Ej. 340.00"
                    value={newOldPrice}
                    onChange={(e) => setNewOldPrice(e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Imagen del Calzado</label>
                  <div className="image-selector-row">
                    {['/shoes/1.png', '/shoes/2.png', '/shoes/3.png', '/shoes/4.png', '/shoes/5.png', '/shoes/6.png', '/shoes/7.png'].map(img => (
                      <button
                        type="button"
                        key={img}
                        className={`img-pick-btn ${newImage === img ? 'selected' : ''}`}
                        onClick={() => setNewImage(img)}
                      >
                        <img src={img} alt="calzado" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="new-shoe-badge">Etiqueta Promocional</label>
                  <input 
                    id="new-shoe-badge"
                    type="text" 
                    placeholder="Ej. -20% o NOVEDAD"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="new-shoe-material">Material de Capellada</label>
                  <input 
                    id="new-shoe-material"
                    type="text" 
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="new-shoe-sole">Tipo de Suela</label>
                  <input 
                    id="new-shoe-sole"
                    type="text" 
                    value={newSole}
                    onChange={(e) => setNewSole(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-section-title">2. Curva de Tallas y Stock Inicial por Par</div>
              <div className="sizes-input-matrix">
                {newSizes.map((s, idx) => (
                  <div key={s.size} className="size-input-card">
                    <span className="size-input-label">Talla {s.size}</span>
                    <input 
                      type="number" 
                      min={0}
                      max={99}
                      value={s.stock}
                      onChange={(e) => {
                        const val = Math.max(0, parseInt(e.target.value) || 0);
                        const updated = [...newSizes];
                        updated[idx].stock = val;
                        setNewSizes(updated);
                      }}
                    />
                    <small>pares</small>
                  </div>
                ))}
              </div>

              <div className="new-sale-summary-box">
                <span>Total pares a registrar en almacén:</span>
                <strong>{newSizes.reduce((acc, c) => acc + c.stock, 0)} pares</strong>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setIsNewModalOpen(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-porto-primary">
                  Guardar Calzado en Catálogo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Quick Adjust Size Stock */}
      {adjustStockProduct && (
        <div className="modal-backdrop" onClick={() => setAdjustStockProduct(null)}>
          <div className="modal-container adjust-stock-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-supertitle">CONTROL DE INVENTARIO</div>
                <h3>Ajustar Stock por Talla: {adjustStockProduct.name}</h3>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setAdjustStockProduct(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="adjust-product-summary">
                <img src={adjustStockProduct.image} alt={adjustStockProduct.name} />
                <div>
                  <strong>{adjustStockProduct.name}</strong>
                  <span className="text-muted">{adjustStockProduct.sku} • {adjustStockProduct.price}</span>
                  <p style={{ fontSize: '12px', marginTop: '4px', color: '#6b7280' }}>
                    Ajusta las cantidades de pares físicos disponibles en almacén por cada número de calzado.
                  </p>
                </div>
              </div>

              <div className="adjust-sizes-list">
                {(adjustStockProduct.sizes || [
                  { size: 38, stock: 2 },
                  { size: 39, stock: 3 },
                  { size: 40, stock: 4 },
                  { size: 41, stock: 4 },
                  { size: 42, stock: 2 },
                  { size: 43, stock: 1 }
                ]).map((s) => (
                  <div key={s.size} className="adjust-size-row">
                    <div className="size-info-badge">
                      <strong>Talla {s.size}</strong>
                      <small>{s.stock === 0 ? 'Sin existencias' : `${s.stock} disponibles`}</small>
                    </div>

                    <div className="stock-stepper">
                      <button 
                        type="button" 
                        className="stepper-btn"
                        onClick={() => handleUpdateSizeStockInline(adjustStockProduct.id, s.size, s.stock, -1)}
                        disabled={s.stock <= 0}
                      >
                        <ChevronDown size={16} />
                      </button>
                      <input 
                        type="number" 
                        className="stepper-input"
                        value={s.stock}
                        onChange={(e) => {
                          const val = Math.max(0, parseInt(e.target.value) || 0);
                          updateProductStock(adjustStockProduct.id, s.size, val);
                        }}
                      />
                      <button 
                        type="button" 
                        className="stepper-btn"
                        onClick={() => handleUpdateSizeStockInline(adjustStockProduct.id, s.size, s.stock, 1)}
                      >
                        <ChevronUp size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn-porto-primary"
                onClick={() => setAdjustStockProduct(null)}
              >
                Cerrar y Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit Shoe */}
      {editingProduct && (
        <div className="modal-backdrop" onClick={() => setEditingProduct(null)}>
          <div className="modal-container inventory-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-supertitle">EDITAR CALZADO</div>
                <h3>{editingProduct.name}</h3>
              </div>
              <button 
                type="button" 
                className="modal-close-btn" 
                onClick={() => setEditingProduct(null)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditProduct} className="inventory-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="edit-shoe-name">Nombre del Modelo</label>
                  <input 
                    id="edit-shoe-name"
                    type="text" 
                    required 
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-shoe-sku">Código SKU</label>
                  <input 
                    id="edit-shoe-sku"
                    type="text" 
                    value={editingProduct.sku || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-shoe-cat">Categoría</label>
                  <input 
                    id="edit-shoe-cat"
                    type="text" 
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-shoe-price">Precio (S/)</label>
                  <input 
                    id="edit-shoe-price"
                    type="number" 
                    step="0.01" 
                    value={editingProduct.numericPrice || 250}
                    onChange={(e) => setEditingProduct({ 
                      ...editingProduct, 
                      numericPrice: parseFloat(e.target.value) || 0,
                      price: `S/ ${(parseFloat(e.target.value) || 0).toFixed(2)}`
                    })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-shoe-oldprice">Precio Anterior (S/)</label>
                  <input 
                    id="edit-shoe-oldprice"
                    type="text" 
                    value={editingProduct.oldPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, oldPrice: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-shoe-badge">Etiqueta Badge</label>
                  <input 
                    id="edit-shoe-badge"
                    type="text" 
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-shoe-material">Material de Cuero</label>
                  <input 
                    id="edit-shoe-material"
                    type="text" 
                    value={editingProduct.material || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, material: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="edit-shoe-sole">Tipo de Suela</label>
                  <input 
                    id="edit-shoe-sole"
                    type="text" 
                    value={editingProduct.sole || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sole: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-porto-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
