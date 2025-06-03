import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div style={{
      width: '100%',
      backgroundColor: 'white',
      display: 'flex',
      justifyContent: 'center',
      padding: '40px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        border: '1px solid black',
        height: '500px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Text content */}
        <div style={{
          width: '50%',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center', // ⬅ Center horizontally
          textAlign: 'center',  // ⬅ Center text
          backgroundColor: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{ width: '30px', height: '2px', backgroundColor: 'black', marginRight: '10px' }}></div>
            <span style={bestsellersStyle}>OUR BESTSELLERS</span>
          </div>

          <h1 style={{
            fontSize: '38px',
            fontWeight: '700',
            lineHeight: '1.2',
            marginBottom: '25px',
            color: '#222',
            maxWidth: '400px'
          }}>
            Latest Arrivals
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            width: 'fit-content',
            marginTop: '10px'
          }}>
            <span style={bestsellersStyle}>SHOP NOW</span>
            <div style={{
              width: '30px',
              height: '1px',
              backgroundColor: '#222',
              marginLeft: '10px'
            }}></div>
          </div>
        </div>

        {/* Image container */}
        <div style={{
          width: '50%',
          height: '100%',
          position: 'relative',
          padding: '0',
          margin: '0'
        }}>
          <img
            src={assets.hero_img}
            alt="Latest Arrivals"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block'
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/600x800/fddede/ffffff?text=Hallyu+Haven';
            }}
          />
          {/* Optional overlay - remove or keep as needed */}
          {/* <div style={{
            position: 'absolute',
            right: '0',
            top: '0',
            width: '30%',
            height: '100%',
            background: 'linear-gradient(to left, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)'
          }}></div> */}
        </div>
      </div>
    </div>
  );
};

const bestsellersStyle = {
  fontSize: '14px',
  fontWeight: '600',
  letterSpacing: '2px',
  color: '#666',
  textTransform: 'uppercase'
};

export default Hero;





