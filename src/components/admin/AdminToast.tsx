import React from 'react';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/useApp';

export const AdminToast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const renderIcon = () => {
    switch (toast.type) {
      case 'warning':
        return <AlertTriangle size={18} color="#d97706" />;
      case 'info':
        return <Info size={18} color="#0284c7" />;
      case 'success':
      default:
        return <CheckCircle2 size={18} color="#1b4d3e" />;
    }
  };

  return (
    <div className={`toast-notification toast-${toast.type}`}>
      {renderIcon()}
      <span>{toast.text}</span>
    </div>
  );
};
