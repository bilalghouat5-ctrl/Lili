import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import './BottomNav.css';

const BottomNav = () => {
  const [active, setActive] = useState('home');
  const { t } = useLanguage();

  const items = [
    { id: 'home', icon: '🏠', label: t('home'), href: '/' },
    { id: 'explore', icon: '🧭', label: t('explore'), href: '/explore' },
    { id: 'wishlist', icon: '❤️', label: t('wishlist'), href: '/wishlist' },
    { id: 'messages', icon: '💬', label: t('messages'), href: '/messages' },
    { id: 'profile', icon: '👤', label: t('profile'), href: '/profile' },
  ];

  return (
    <nav className="bottom-nav glass-card">
      {items.map(item => (
        <a
          key={item.id}
          href={item.href}
          className={`bottom-nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => setActive(item.id)}
        >
          <div className="bottom-nav-icon">
            <span>{item.icon}</span>
            {active === item.id && <div className="active-dot" />}
          </div>
          <span className="bottom-nav-label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
};

export default BottomNav;
