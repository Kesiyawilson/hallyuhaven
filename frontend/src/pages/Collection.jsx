import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import dropdownIcon from '../assets/dropdown_icon.png';
import './Collection.css';

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showFilters, setShowFilters] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setShowFilters(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = {
    Men: ['Hoodies', 'T-Shirts', 'Varsityjacket', 'Bottomwear'],
    Women: ['Hoodies', 'T-Shirts', 'Tops', 'Bottomwear', 'Sweaters'],
    Accessories: ['Photocards', 'LightSticks', 'Key-Chains', 'Plushies'],
  };

  const toggleFilters = () => {
    if (isMobile) setShowFilters((prev) => !prev);
  };

  return (
    <div className="collection-container">
      <div className="filter-header" onClick={toggleFilters}>
        <p className="filter-title">FILTERS</p>
        {isMobile && (
          <img
            src={dropdownIcon}
            alt="Toggle"
            className={`dropdown-icon ${showFilters ? 'rotated' : ''}`}
          />
        )}
      </div>

      {showFilters && (
        <div className="filter-box unified-filter-box">
          {Object.entries(categories).map(([title, items]) => (
            <div key={title} className="category-section">
              <p className="category-heading">{title}</p>
              <div className="subcategory-list">
                {items.map((item, index) => (
                  <label key={index} className="subcategory-item">
                    <input type="checkbox" value={item} />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;






