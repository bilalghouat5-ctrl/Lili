import React, { useState, useEffect } from 'react';
import './OfflineBanner.css';

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showReturnBanner, setShowReturnBanner] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReturnBanner(true);
      setTimeout(() => setShowReturnBanner(false), 3000);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !showReturnBanner) return null;

  return (
    <div className={`offline-banner ${isOnline ? 'online' : 'offline'}`}>
      <span>{isOnline ? '✅' : '📡'}</span>
      <p>
        {isOnline
          ? 'تم استعادة الاتصال بالإنترنت!'
          : 'أنت غير متصل. بعض الميزات غير متاحة.'}
      </p>
    </div>
  );
};

export default OfflineBanner;
