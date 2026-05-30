import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'booking',
      title: 'حجز جديد! 🎉',
      message: 'سارة محمدي حجزت فيلاك في مستغانم',
      time: 'منذ 5 دقائق',
      read: false,
      icon: '📅',
    },
    {
      id: 2,
      type: 'message',
      title: 'رسالة جديدة 💬',
      message: 'كريم: "هل المكان متاح في عيد الأضحى؟"',
      time: 'منذ 15 دقيقة',
      read: false,
      icon: '💬',
    },
    {
      id: 3,
      type: 'review',
      title: 'تقييم جديد ⭐',
      message: 'أمينة أعطتك تقييم 5 نجوم!',
      time: 'منذ ساعة',
      read: true,
      icon: '⭐',
    },
  ]);

  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const pushNotification = (title, message, icon = '🔔') => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body: message, icon });
    }
    addToast({ title, message, type: 'info' });
  };

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      toasts,
      addToast,
      removeToast,
      markAllRead,
      unreadCount,
      pushNotification,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
