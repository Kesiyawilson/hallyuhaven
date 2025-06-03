import React from 'react';
import './Hero.css';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-inner">
        {/* Text content - centered */}
        <div className="hero-left centered-text">
          <div className="bestseller-wrapper">
            <div className="line"></div>
            <span className="bestsellers-style">OUR BESTSELLERS</span>
          </div>

          <h1 className="hero-heading prata-regular">Latest Arrivals</h1>

          <div className="hero-shop-now">
            <span className="bestsellers-style">SHOP NOW</span>
            <div className="hero-line"></div>
          </div>
        </div>

        {/* Image content */}
        <div className="hero-right">
          <img
            src={assets.hero_img}
            alt="Latest Arrivals"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/600x800/fddede/ffffff?text=Hallyu+Haven';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
