import React, { useState } from 'react';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const [period, setPeriod] = useState('month');

  const stats = [
    {
      icon: '💰', label: 'الإيرادات الكلية',
      value: '387,500 دج', change: '+23%', positive: true
    },
    {
      icon: '📅', label: 'إجمالي الحجوزات',
      value: '42', change: '+15%', positive: true
    },
    {
      icon: '👥', label: 'الضيوف',
      value: '156', change: '+8%', positive: true
    },
    {
      icon: '⭐', label: 'التقييم المتوسط',
      value: '4.8', change: '+0.2', positive: true
    },
    {
      icon: '🏠', label: 'نسبة الإشغال',
      value: '78%', change: '-3%', positive: false
    },
    {
      icon: '💬', label: 'معدل الاستجابة',
      value: '96%', change: '+4%', positive: true
    },
  ];

  const monthlyRevenue = [
    { month: 'يوليو', value: 45000, bookings: 8 },
    { month: 'أغسطس', value: 72000, bookings: 12 },
    { month: 'سبتمبر', value: 38000, bookings: 7 },
    { month: 'أكتوبر', value: 55000, bookings: 9 },
    { month: 'نوفمبر', value: 48000, bookings: 8 },
    { month: 'ديسمبر', value: 95000, bookings: 16 },
  ];

  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.value));

  const topProperties = [
    {
      name: 'فيلا بمسبح - مستغانم',
      image: 'https://picsum.photos/60/60?random=1',
      revenue: '180,000 دج',
      bookings: 18,
      rating: 4.9,
      occupancy: 85,
    },
    {
      name: 'شقة فاخرة - الجزائر',
      image: 'https://picsum.photos/60/60?random=2',
      revenue: '128,000 دج',
      bookings: 16,
      rating: 4.7,
      occupancy: 72,
    },
    {
      name: 'شاليه جبلي - تيزي وزو',
      image: 'https://picsum.photos/60/60?random=5',
      revenue: '79,500 دج',
      bookings: 8,
      rating: 4.6,
      occupancy: 60,
    },
  ];

  const recentActivity = [
    { icon: '📅', text: 'حجز جديد: سارة محمدي - فيلا مستغانم', time: 'منذ 5 دقائق' },
    { icon: '⭐', text: 'تقييم جديد 5 نجوم من كريم بوعلام', time: 'منذ ساعة' },
    { icon: '💰', text: 'تحويل: 75,000 دج إلى حسابك', time: 'منذ 3 ساعات' },
    { icon: '💬', text: 'رسالة جديدة من أمينة دريسي', time: 'منذ 5 ساعات' },
    { icon: '❌', text: 'إلغاء حجز: يوسف مزياني', time: 'أمس' },
  ];

  return (
    <div className="analytics-page" dir="rtl">
      <div className="analytics-header">
        <div>
          <h1>📊 التقارير والإحصاءات</h1>
          <p>متابعة أداء عقاراتك في الوقت الفعلي</p>
        </div>
        <div className="period-selector">
          {['week', 'month', 'year'].map(p => (
            <button
              key={p}
              className={`period-btn ${period === p ? 'active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p === 'week' ? 'أسبوع' : p === 'month' ? 'شهر' : 'سنة'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="analytics-stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="analytics-stat-card glass-card">
            <div className="stat-top">
              <span className="stat-card-icon">{stat.icon}</span>
              <span className={`stat-change-badge ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.change}
              </span>
            </div>
            <div className="stat-card-value">{stat.value}</div>
            <div className="stat-card-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="analytics-content">
        {/* Revenue Chart */}
        <div className="analytics-card">
          <h3>📈 الإيرادات الشهرية</h3>
          <div className="bar-chart">
            {monthlyRevenue.map((item, i) => (
              <div key={i} className="bar-item">
                <div className="bar-value">
                  {(item.value / 1000).toFixed(0)}K
                </div>
                <div className="bar-wrapper">
                  <div
                    className="bar-fill"
                    style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                  />
                </div>
                <div className="bar-label">{item.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="analytics-card activity-card">
          <h3>⚡ النشاط الأخير</h3>
          <div className="activity-list">
            {recentActivity.map((item, i) => (
              <div key={i} className="activity-item">
                <div className="activity-icon">{item.icon}</div>
                <div className="activity-info">
                  <p>{item.text}</p>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Properties */}
      <div className="analytics-card">
        <h3>🏆 أفضل العقارات أداءً</h3>
        <div className="top-properties">
          {topProperties.map((prop, i) => (
            <div key={i} className="top-property-row">
              <div className="top-rank">#{i + 1}</div>
              <img src={prop.image} alt={prop.name} className="top-prop-img" />
              <div className="top-prop-info">
                <strong>{prop.name}</strong>
                <p>
                  {prop.bookings} حجز · ⭐ {prop.rating}
                </p>
              </div>
              <div className="occupancy-bar">
                <div className="occupancy-label">الإشغال</div>
                <div className="occupancy-track">
                  <div
                    className="occupancy-fill"
                    style={{ width: `${prop.occupancy}%` }}
                  />
                </div>
                <span>{prop.occupancy}%</span>
              </div>
              <div className="top-prop-revenue">
                <strong>{prop.revenue}</strong>
                <span>الإيرادات</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
