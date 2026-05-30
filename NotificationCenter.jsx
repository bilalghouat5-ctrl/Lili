import React from 'react';
import { useNotification } from '../context/NotificationContext';
import './NotificationCenter.css';

const ToastItem = ({ toast, onRemove }) => {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: '💬',
  };

  return (
    <div
      className={`toast toast-${toast.type}`}
      onClick={() => onRemove(toast.id)}
    >
      <span className="toast-icon">{icons[toast.type] || '🔔'}</span>
      <div className="toast-content">
        <strong>{toast.title}</strong>
        {toast.message && <p>{toast.message}</p>}
      </div>
      <button className="toast-close">✕</button>
    </div>
  );
};

const NotificationCenter = () => {
  const { toasts, removeToast } = useNotification();

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={removeToast}
        />
      ))}
    </div>
  );
};

export default NotificationCenter;
