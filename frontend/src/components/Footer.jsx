import React from 'react';
import { assets } from '../assets/assets';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <img src={assets.logo} className="footer-logo" alt="Logo" />
          <p className="footer-text">
            Explore the best in K-pop fashion and exclusive merch.
            <br />
            From cozy hoodies to cute plushies, we bring your faves to life.
            <br />
            Trusted by thousands of fans across the world.
            <br />
            Shop now and join the ultimate K-pop experience!
          </p>
        </div>

        <div className="footer-right-wrapper">
          <div className="footer-right">
            <p className="footer-title">COMPANY</p>
            <ul className="footer-links">
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div className="footer-right">
            <p className="footer-title">GET IN TOUCH</p>
            <ul className="footer-links">
              <li>+1-212-456-7890</li>
              <li>contact@hallyuhaven.com</li>
            </ul>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />
      <div className="footer-bottom">
        <p className="copyright-text">
          © {new Date().getFullYear()} Hallyu Haven. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;




