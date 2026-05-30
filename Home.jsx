import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useInView } from '../hooks/useInView';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { SkeletonGrid } from '../components/SkeletonCard';
import PropertyCard from '../components/PropertyCard';
import BottomSheet from '../components/BottomSheet';
import './Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    rooms: 0,
    guests: 0,
    amenities: [],
  });
  const [wishlist, setWishlist] = useState([]);
  const [pullRefreshing, setPullRefreshing] = useState(false);
  const [heroGradient, setHeroGradient] = useState(0);
  const loadMoreRef = useRef(null);
  const { t } = useLanguage();
  const { gradients } = useTheme();
  const isInView = useInView(loadMoreRef);

  const allProperties = [
    {
      id: 1, name: 'فيلا فاخرة بمسبح على البحر',
      location: 'مستغانم', wilaya: 'مستغانم',
      type: 'فيلا', category: 'beach',
      rooms: 4, guests: 8, bathrooms: 3,
      price: 15000, rating: 4.9, reviews: 128,
      badge: '🔥 الأكثر طلباً',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
      amenities: ['🏊 مسبح', '🌊 شاطئ', '🅿️ موقف', '📶 واي فاي'],
      featured: true, trending: true,
    },
    {
      id: 2, name: 'شقة عصرية في قلب العاصمة',
      location: 'الجزائر العاصمة', wilaya: 'الجزائر',
      type: 'شقة', category: 'city',
      rooms: 3, guests: 6, bathrooms: 2,
      price: 8000, rating: 4.7, reviews: 95,
      badge: '⭐ جديد',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      amenities: ['❄️ مكيف', '📺 تلفزيون', '🍳 مطبخ', '📶 واي فاي'],
      featured: true, trending: false,
    },
    {
      id: 3, name: 'بيت تقليدي في القصبة',
      location: 'الجزائر العاصمة', wilaya: 'الجزائر',
      type: 'بيت تقليدي', category: 'heritage',
      rooms: 2, guests: 4, bathrooms: 1,
      price: 5000, rating: 4.8, reviews: 203,
      badge: '🏆 تراثي',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      amenities: ['🌿 حديقة', '☕ إفطار', '📶 واي فاي', '🔒 آمن'],
      featured: false, trending: true,
    },
    {
      id: 4, name: 'خيمة صحراوية فاخرة',
      location: 'تمنراست', wilaya: 'تمنراست',
      type: 'خيمة', category: 'desert',
      rooms: 1, guests: 2, bathrooms: 1,
      price: 12000, rating: 5.0, reviews: 67,
      badge: '✨ حصري',
      image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=800&q=80',
      amenities: ['🌅 شروق', '🐪 جمال', '⭐ نجوم', '🔥 نار'],
      featured: true, trending: true,
    },
    {
      id: 5, name: 'شاليه جبلي في الغابة',
      location: 'تيزي وزو', wilaya: 'تيزي وزو',
      type: 'شاليه', category: 'mountain',
      rooms: 3, guests: 6, bathrooms: 2,
      price: 9000, rating: 4.6, reviews: 54,
      badge: '🌿 طبيعي',
      image: 'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=800&q=80',
      amenities: ['🌲 طبيعة', '🏔️ جبال', '🔥 مدفأة', '📶 واي فاي'],
      featured: false, trending: false,
    },
    {
      id: 6, name: 'فيلا مع حديقة في تلمسان',
      location: 'تلمسان', wilaya: 'تلمسان',
      type: 'فيلا', category: 'city',
      rooms: 5, guests: 10, bathrooms: 4,
      price: 20000, rating: 4.8, reviews: 89,
      badge: '🌟 فاخر',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      amenities: ['🌿 حديقة', '🏊 مسبح', '🅿️ موقف', '🔒 أمن'],
      featured: true, trending: false,
    },
  ];

  const categories = [
    { id: 'all', icon: '🏠', name: 'الكل' },
    { id: 'beach', icon: '🏖️', name: 'شاطئية' },
    { id: 'mountain', icon: '🏔️', name: 'جبلية' },
    { id: 'city', icon: '🏙️', name: 'مدينية' },
    { id: 'desert', icon: '🌴', name: 'صحراوية' },
    { id: 'heritage', icon: '🕌', name: 'تراثية' },
  ];

  // Simulate fetching with loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setProperties(allProperties.slice(0, 6));
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Rotate hero gradient
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroGradient(prev => (prev + 1) % gradients.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [gradients.length]);

  // Infinite Scroll
  useEffect(() => {
    if (isInView && hasMore && !loading) {
      setTimeout(() => {
        const nextProperties = allProperties.slice(
          properties.length,
          properties.length + 3
        );
        if (nextProperties.length > 0) {
          setProperties(prev => [...prev, ...nextProperties]);
        } else {
          setHasMore(false);
        }
      }, 800);
    }
  }, [isInView, properties.length, hasMore, loading]);

  // Pull to Refresh
  const handlePullRefresh = useCallback(() => {
    setPullRefreshing(true);
    setTimeout(() => {
      setProperties(allProperties.slice(0, 6));
      setPullRefreshing(false);
    }, 1500);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredProperties = properties.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
    if (filters.rooms > 0 && p.rooms < filters.rooms) return false;
    if (filters.guests > 0 && p.guests < filters.guests) return false;
    return true;
  });

  const currentGradient = gradients[heroGradient] || gradients[0];

  return (
    <div className="home-page" dir="rtl">
      {/* Pull to Refresh Indicator */}
      {pullRefreshing && (
        <div className="pull-refresh-indicator">
          <div className="refresh-spinner" />
          <span>جاري التحديث...</span>
        </div>
      )}

      {/* ===== HERO SECTION ===== */}
      <section
        className="hero-section"
        style={{
          background: `linear-gradient(135deg, ${currentGradient.colors[0]}, ${currentGradient.colors[1]})`,
          transition: 'background 1s ease',
        }}
      >
        <div className="hero-particles">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                width: `${20 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 60}px`,
              }}
            />
          ))}
        </div>

        <div className="hero-content animate-fadeInUp">
          <div className="hero-badge">
            <span>🏆</span> المنصة الأولى للإيجار في الجزائر
          </div>

          <h1 className="hero-title">
            اكتشف أجمل{' '}
            <span className="hero-highlight">الأماكن</span>
            {' '}في 🇩🇿
          </h1>

          <p className="hero-subtitle">
            آلاف العقارات في كل ولايات الجزائر بأسعار تنافسية
          </p>

          {/* Hero Stats */}
          <div className="hero-stats stagger-children">
            {[
              { value: '+500', label: 'عقار' },
              { value: '48', label: 'ولاية' },
              { value: '+2K', label: 'مستخدم' },
              { value: '4.9⭐', label: 'تقييم' },
            ].map((stat, i) => (
              <div key={i} className="hero-stat glass-card animate-fadeInUp">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Search Box */}
          <div className="hero-search-box glass-card animate-scaleIn">
            <div className="search-field">
              <label>📍 الوجهة</label>
              <select>
                <option>اختر الولاية</option>
                {[
                  'الجزائر', 'وهران', 'قسنطينة', 'مستغانم',
                  'بجاية', 'تلمسان', 'تيزي وزو', 'تمنراست'
                ].map(w => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <label>📅 الوصول</label>
              <input type="date" />
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <label>📅 المغادرة</label>
              <input type="date" />
            </div>
            <div className="search-divider" />
            <div className="search-field">
              <label>👥 الضيوف</label>
              <select>
                {[1,2,3,4,5,6,7,8].map(n => (
                  <option key={n}>{n} ضيوف</option>
                ))}
              </select>
            </div>
            <button className="hero-search-btn">
              🔍 ابحث الآن
            </button>
          </div>

          {/* Trending Tags */}
          <div className="trending-tags">
            <span>🔥 رائج:</span>
            {['مستغانم', 'تيزي وزو', 'تمنراست', 'الجزائر'].map(tag => (
              <button key={tag} className="trending-tag">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="categories-section">
        <div className="categories-scroll">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        <button
          className="filter-btn"
          onClick={() => setShowFilters(true)}
        >
          ⚙️ {t('filters')}
        </button>
      </section>

      {/* ===== FEATURED LISTINGS ===== */}
      <section className="section">
        <div className="section-header">
          <div>
            <h2>✨ العقارات المميزة</h2>
            <p>اختيارات مميزة لإقامة لا تُنسى</p>
          </div>
          <a href="/explore" className="see-all-btn">عرض الكل →</a>
        </div>

        {loading ? (
          <SkeletonGrid count={3} />
        ) : (
          <div className="properties-grid stagger-children">
            {filteredProperties
              .filter(p => p.featured)
              .map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isWishlisted={wishlist.includes(property.id)}
                  onWishlist={toggleWishlist}
                />
              ))
            }
          </div>
        )}
      </section
