import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image skeleton" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton" style={{ width: '70%' }} />
        <div className="skeleton-line skeleton" style={{ width: '50%' }} />
        <div className="skeleton-line skeleton" style={{ width: '40%' }} />
        <div className="skeleton-footer">
          <div className="skeleton-price skeleton" />
          <div className="skeleton-btn skeleton" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonGrid = ({ count = 6 }) => {
  return (
    <div className="skeleton-grid">
      {[...Array(count)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonCard;
