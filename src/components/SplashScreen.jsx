import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('جاري التحميل...');

  useEffect(() => {
    const texts = [
      'جاري التحميل...',
      'جلب العقارات...',
      'تجهيز التطبيق...',
      'أهلاً بك! 🎉'
    ];
    let i = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 25;
        if (next >= 100) clearInterval(interval);
        return Math.min(next, 100);
      });
      if (i < texts.length - 1) {
        i++;
        setText(texts[i]);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="splash-screen">
      <div className="splash-bg" />

      <div className="splash-content">
        <div className="splash-logo animate-float">
          <span className="splash-icon">🏠</span>
          <h1 className="splash-title gradient-text">DarDzair</h1>
          <p className="splash-subtitle">أفضل منصة عقارية في الجزائر</p>
        </div>

        <div className="splash-progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="progress-text">{text}</p>
        </div>

        <div className="splash-flags">
          🇩🇿
        </div>
      </div>

      <div className="splash-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
