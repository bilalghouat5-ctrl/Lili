import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount, notifications } = useNotification();
  const searchRef = useRef(null);

  const algerianCities = [
    'الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة',
    'بجاية', 'تلمسان', 'سطيف', 'تيزي وزو', 'مستغانم',
    'تمنراست', 'بسكرة', 'الأغواط', 'ورقلة', 'أدرار'
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = algerianCities.filter(city =>
        city.includes(query)
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'ar' ? 'ar-DZ' : language === 'fr' ? 'fr-FR' : 'en-US';
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        handleSearch(transcript);
      };
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${theme}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <div className="navbar-logo">
          <div className="logo-icon animate-pulse">🏠</div>
          <span className="logo-text gradient-text">DarDzair</span>
        </div>

        {/* Smart Search */}
        <div
          className={`navbar-search ${searchActive ? 'expanded' : ''}`}
          ref={searchRef}
        >
          <div
            className="search-pill"
            onClick={() => setSearchActive(true)}
          >
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setSearchActive(true)}
            />
            <button className="voice-btn" onClick={handleVoiceSearch}>
              🎤
            </button>
          </div>

          {/* Search Suggestions */}
          {searchActive && suggestions.length > 0 && (
            <div className="search-suggestions glass-card">
              <div className="suggestions-header">
                <span>📍 اقتراحات</span>
              </div>
              {suggestions.map((city, i) => (
                <div
                  key={i}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery(city);
                    setSuggestions([]);
                    setSearchActive(false);
                  }}
                >
                  <span className="s-icon">📍</span>
                  <div>
                    <strong>{city}</strong>
                    <span>الجزائر</span>
                  </div>
                </div>
              ))}

              <div className="suggestions-header">
                <span>🔥 الأكثر بحثاً</span>
              </div>
              {['مستغانم', 'تيزي وزو', 'تمنراست'].map((city, i) => (
                <div
                  key={i}
                  className="suggestion-item trending"
                  onClick={() => setSearchQuery(city)}
                >
                  <span className="s-icon">🔥</span>
                  <div>
                    <strong>{city}</strong>
                    <span>شائع الآن</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Add Property */}
          <button className="nav-action-btn host-btn">
            🏠 {t('addProperty')}
          </button>

          {/* Language Selector */}
          <div className="language-selector">
            <button
              className="nav-icon-btn"
              onClick={() => setShowLanguages(!showLanguages)}
            >
              🌐 {language.toUpperCase()}
            </button>
            {showLanguages && (
              <div className="dropdown-menu glass-card">
                {['ar', 'fr', 'en'].map(lang => (
                  <button
                    key={lang}
                    className={`dropdown-item ${language === lang ? 'active' : ''}`}
                    onClick={() => {
                      changeLanguage(lang);
                      setShowLanguages(false);
                    }}
                  >
                    {lang === 'ar' ? '🇩🇿 العربية' : lang === 'fr' ? '🇫🇷 Français' : '🇬🇧 English'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            className="nav-icon-btn theme-btn"
            onClick={toggleTheme}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Notifications */}
          <div className="notif-wrapper">
            <button
              className="nav-icon-btn notif-btn"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              🔔
              {unreadCount > 0 && (
                <span className="notif-badge">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <div className="notifications-panel glass-card">
                <div className="panel-header">
                  <h3>الإشعارات</h3>
                  <button className="mark-all">قراءة الكل</button>
                </div>
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    className={`notif-item ${!notif.read ? 'unread' : ''}`}
                  >
                    <span className="notif-icon">{notif.icon}</span>
                    <div className="notif-content">
                      <strong>{notif.title}</strong>
                      <p>{notif.message}</p>
                      <span className="notif-time">{notif.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="user-menu-wrapper">
            <button
              className="user-avatar-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {isAuthenticated && user ? (
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt="avatar"
                  className="avatar-img"
                />
              ) : (
                <span className="avatar-placeholder">👤</span>
              )}
              <span className="user-menu-icon">☰</span>
            </button>

            {showUserMenu && (
              <div className="user-dropdown glass-card">
                {isAuthenticated ? (
                  <>
                    <div className="user-info">
                      <strong>{user?.name || 'مستخدم'}</strong>
                      <span>{user?.email}</span>
                    </div>
                    <div className="dropdown-divider" />
                    <a href="/profile" className="dropdown-item">👤 حسابي</a>
                    <a href="/dashboard" className="dropdown-item">📊 لوحة التحكم</a>
                    <a href="/wishlist" className="dropdown-item">❤️ المفضلة</a>
                    <a href="/messages" className="dropdown-item">💬 الرسائل</a>
                    <div className="dropdown-divider" />
                    <button
                      className="dropdown-item logout"
                      onClick={logout}
                    >
                      🚪 تسجيل الخروج
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/auth" className="dropdown-item bold">تسجيل الدخول</a>
                    <a href="/auth" className="dropdown-item">إنشاء حساب</a>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
