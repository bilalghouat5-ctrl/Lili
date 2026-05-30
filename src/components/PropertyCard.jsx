import React, { useState, useRef } from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property, isWishlisted, onWishlist }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showQuickView, setShowQuickView] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef(null);

  const images = [
    property.image,
    `https://picsum.photos/800/500?random=${property.id + 10}`,
    `https://picsum.photos/800/500?random=${property.id + 20}`,
  ];

  const handleMouseEnter = () => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % images.length;
      setCurrentImage(i);
      if (i === images.length - 1) clearInterval(interval);
    }, 800);
  };

  const handleRipple = (e) => {
    const card = cardRef.current;
    const ripple = document.createElement('div');
    const rect = card.getBoundingClientRect();
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - rect.left}px`;
    ripple.style.top = `${e.clientY - rect.top}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div
      ref={cardRef}
      className="property-card ripple-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setCurrentImage(0)}
      onClick={handleRipple}
    >
      {/* Image Section */}
      <div className="card-image-wrapper">
        {!imageLoaded && <div className="skeleton" style={{ height: '100%' }} />}
        <img
          src={images[currentImage]}
          alt={property.name}
          className={`card-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Image Dots */}
        <div className="image-dots">
          {images.map((_, i) => (
            <div
              key={i}
              className={`dot ${currentImage === i ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Badge */}
        <span className="card-badge">{property.badge}</span>

        {/* Wishlist */}
        <button
          className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onWishlist(property.id);
          }}
        >
          <span
            style={{
              animation: isWishlisted ? 'heartBeat 0.5s ease' : 'none'
            }}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </span>
        </button>

        {/* Quick View */}
        <button
          className="quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowQuickView(true);
          }}
        >
          👁️ معاينة سريعة
        </button>
      </div>

      {/* Card Info */}
      <div className="card-info">
        <div className="card-header">
          <h3 className="card-title">{property.name}</h3>
          <div className="card-rating">
            <span>⭐</span>
            <strong>{property.rating}</strong>
            <span className="reviews-count">({property.reviews})</span>
          </div>
        </div>

        <p className="card-location">📍 {property.location}</p>

        <div className="card-meta">
          <span>🛏️ {property.rooms} غرف</span>
          <span>👥 {property.guests} ضيوف</span>
          <span>🚿 {property.bathrooms} حمام</span>
        </div>

        {/* Amenities Preview */}
        <div className="card-amenities">
          {property.amenities?.slice(0, 3).map((a, i) => (
            <span key={i} className="amenity-tag">{a}</span>
          ))}
        </div>

        <div className="card-footer">
          <div className="card-price">
            <span className="price-amount">
              {property.price.toLocaleString()}
            </span>
            <span className="price-currency"> دج</span>
            <span className="price-period"> / ليلة</span>
          </div>
          <a href={`/booking/${property.id}`} className="book-now-btn">
            احجز الآن
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div
          className="quick-view-overlay"
          onClick={() => setShowQuickView(false)}
        >
          <div
            className="quick-view-modal glass-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="qv-close"
              onClick={() => setShowQuickView(false)}
            >
              ✕
            </button>
            <img src={property.image} alt={property.name} />
            <div className="qv-info">
              <h3>{property.name}</h3>
              <p>📍 {property.location} · ⭐ {property.rating}</p>
              <div className="qv-amenities">
                {property.amenities?.map((a, i) => (
                  <span key={i}>{a}</span>
                ))}
              </div>
              <div className="qv-footer">
                <div className="qv-price">
                  <strong>{property.price.toLocaleString()} دج</strong>
                  <span>/ليلة</span>
                </div>
                <a href={`/property/${property.id}`} className="qv-view-btn">
                  عرض التفاصيل
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
