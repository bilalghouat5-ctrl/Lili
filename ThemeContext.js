import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );
  const [accentColor, setAccentColor] = useState('#FF385C');
  const [isDynamic, setIsDynamic] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', accentColor);
  }, [accentColor]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const gradients = [
    { name: 'أحمر', colors: ['#FF385C', '#E31C5F'] },
    { name: 'أزرق', colors: ['#667eea', '#764ba2'] },
    { name: 'أخضر', colors: ['#43e97b', '#38f9d7'] },
    { name: 'ذهبي', colors: ['#f6d365', '#fda085'] },
    { name: 'بنفسجي', colors: ['#a18cd1', '#fbc2eb'] },
    { name: 'محيطي', colors: ['#4facfe', '#00f2fe'] },
  ];

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme,
      accentColor,
      setAccentColor,
      isDynamic,
      setIsDynamic,
      gradients
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
