import React, { useState } from 'react';
import { X, Lock, Shield, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/useApp';

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, loginAsAdmin } = useApp();
  const [email, setEmail] = useState('admin@porto.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      loginAsAdmin();
    } else {
      setError('Por favor ingresa un correo y contraseña válidos.');
    }
  };

  const handleQuickLogin = () => {
    loginAsAdmin();
  };

  return (
    <div className="modal-backdrop" onClick={closeAuthModal}>
      <div 
        className="modal-container admin-auth-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          type="button" 
          className="modal-close-btn" 
          onClick={closeAuthModal}
          aria-label="Cerrar modal"
        >
          <X size={20} />
        </button>

        <div className="auth-modal-header">
          <div className="auth-badge">
            <Shield size={18} />
            <span>Porto Admin Portal</span>
          </div>
          <h2>Panel Administrativo</h2>
          <p>Ingresa para gestionar tus ventas, pedidos y cartera de clientes.</p>
        </div>

        <div className="quick-access-banner">
          <div className="quick-access-info">
            <CheckCircle2 size={18} color="#2e7d32" />
            <div>
              <strong>Acceso de Demostración</strong>
              <span>Credenciales preconfiguradas para acceso instantáneo</span>
            </div>
          </div>
          <button 
            type="button" 
            className="btn-quick-login"
            onClick={handleQuickLogin}
          >
            Ingresar Ahora <ArrowRight size={16} />
          </button>
        </div>

        <div className="auth-divider">
          <span>O ingresa con tus credenciales</span>
        </div>

        {error && <div className="auth-error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="admin-email">Correo Electrónico</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input 
                id="admin-email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@porto.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Contraseña</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                id="admin-password"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-admin-submit">
            Iniciar Sesión como Administrador
          </button>
        </form>

        <div className="auth-footer-help">
          <p>
            Al ingresar tendrás acceso total a:
          </p>
          <div className="auth-features-list">
            <span>✓ Control y estados de ventas</span>
            <span>✓ Registro y gestión de clientes</span>
            <span>✓ Reportes y métricas de ingresos</span>
          </div>
        </div>
      </div>
    </div>
  );
};
