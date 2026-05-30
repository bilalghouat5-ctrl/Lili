import React, { useState, useEffect } from 'react';
import './FloatingSearchBar.css';

const FloatingSearchBar = () => {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className={`floating-search glass-card ${visible ? 'visible' : ''}`}>
      <span>🔍</span>
      <input
        type="text"
        placeholder="ابحث سريعاً..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="floating-search-btn">بحث</button>
    </div>
  );
};

export default FloatingSearchBar;
