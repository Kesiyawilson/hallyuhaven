import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
  const sidebar = document.querySelector('.sidebar');
  const menuIcon = document.querySelector('.menu-icon');
  const profileIcon = document.querySelector('.profile-icon');

  // Close sidebar if click is outside both sidebar and menu icon
  if (sidebar && !sidebar.contains(event.target)) {
    if (menuIcon && !menuIcon.contains(event.target)) {
      setShowSidebar(false);
    }
  }

  // Close dropdown if click is outside profile icon
  if (showDropdown && profileIcon && !profileIcon.contains(event.target)) {
    setShowDropdown(false);
  }
};


    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSidebar, showDropdown]);

  const toggleDropdown = () => {
    if (isMobile) {
      setShowDropdown(!showDropdown);
    }
  };

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 40px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        backgroundColor: 'white',
        position: 'relative',
        borderBottom: '1px solid #e0e0e0',

      }}>
        
        {/* Left - Logo */}
        <div style={{ flex: '1' }}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <img 
              src={assets.logo} 
              style={{ width: '160px', height: 'auto', cursor: 'pointer' }} 
              alt="Hallyu Haven" 
            />
          </NavLink>
        </div>


        {/* Center - Navigation Links - Hidden on mobile */}
        {!isMobile && (
          <div style={{ 
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', 
            gap: '30px',
            zIndex: 1
          }}>
            {['/', '/collection', '/about', '/contact'].map((path, i) => {
              const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'];
              return (
                <NavLink 
                  key={path}
                  to={path}
                  style={({ isActive }) => ({ 
                    color: isActive ? '#000' : '#666',
                    textDecoration: 'none',
                    fontSize: '16px',
                    fontWeight: '500',
                    paddingBottom: '4px',
                    borderBottom: isActive ? '1.5px solid #000' : 'none',
                    position: 'relative',
                    zIndex: 2
                  })}
                >
                  {labels[i]}
                </NavLink>
              );
            })}
          </div>
        )}

        {/* Right - Icons */}
        <div style={{ 
          flex: '1', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '20px', 
          alignItems: 'center',
          position: 'relative'
        }}>
          <img 
            src={assets.search_icon} 
            style={{ width: '25px', height: 'auto', cursor: 'pointer' }} 
            alt="Search" 
          />
          
          <div 
            className="profile-icon"
            style={{ position: 'relative' }}
            onMouseEnter={() => !isMobile && setShowDropdown(true)}
            onMouseLeave={() => !isMobile && setShowDropdown(false)}
            onClick={toggleDropdown}
          >
            <img 
              src={assets.profile_icon}
              style={{ width: '25px', height: 'auto', cursor: 'pointer' }} 
              alt="Profile" 
            />
            {(showDropdown || (isMobile && showDropdown)) && (
              <div style={{
                position: isMobile ? 'fixed' : 'absolute',
                right: isMobile ? '20px' : 0,
                top: isMobile ? '70px' : '100%',
                backgroundColor: '#f8f8f8',
                minWidth: '160px',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.1)',
                zIndex: 10,
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  padding: '12px 16px', 
                  color: '#555',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                >My Profile</div>
                <div style={{ 
                  padding: '12px 16px', 
                  color: '#555',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                >Orders</div>
                <div style={{ 
                  padding: '12px 16px', 
                  color: '#555',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                >Logout</div>
              </div>
            )}
          </div>

          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <img 
              src={assets.cart_icon} 
              style={{ width: '25px', height: 'auto' }} 
              alt="Cart" 
            />
            {cartItemsCount > 0 && (
              <div style={{
                position: 'absolute',
                bottom: '-5px',
                right: '-5px',
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                {cartItemsCount}
              </div>
            )}
          </div>

          {isMobile && (
            <div 
              className="menu-icon"
              style={{ cursor: 'pointer', padding: '5px' }}
              onClick={() => setShowSidebar(true)}
            >
              <img 
                src={assets.menu_icon} 
                style={{ width: '25px', height: 'auto' }} 
                alt="Menu" 
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobile && showSidebar && (
        <div className="sidebar" style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0, // 🔑 ensure it stretches to the bottom
          left: 0,   // 🔑 make it full width
          backgroundColor: 'white',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto', // allows scrolling if content overflows
        }}>
        
          {/* Back Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '20px',
            borderBottom: '1px solid #eee'
          }}>
            <button 
              onClick={() => setShowSidebar(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {['/', '/collection', '/about', '/contact'].map((path, i) => {
  const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'];
  return (
    <NavLink 
      key={path}
      to={path}
      className="nav-link"
      style={({ isActive }) => ({ 
        color: isActive ? '#fff' : '#666',
        backgroundColor: isActive ? 'black' : 'transparent',
        textDecoration: 'none',
        fontSize: '18px',
        fontWeight: '500',
        padding: '8px 16px',
        borderRadius: '4px',
      })}
      onClick={() => setShowSidebar(false)}
    >
      {labels[i]}
    </NavLink>
  );
})}

          </div>
        </div>
      )}

      {/* Overlay when sidebar is open */}
      {isMobile && showSidebar && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999
        }} />
      )}
    </>
  );
};

export default Navbar;