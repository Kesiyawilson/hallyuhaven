import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState('');
  const { showSearch, setShowSearch } = useContext(ShopContext);

  // Get current route path
  const location = useLocation();

  // Handle screen resize to toggle mobile/desktop layout
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle clicks outside dropdown/sidebar to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector('.sidebar');
      const menuIcon = document.querySelector('.menu-icon');
      const profileIcon = document.querySelector('.profile-icon');

      if (sidebar && !sidebar.contains(event.target) && menuIcon && !menuIcon.contains(event.target)) {
        setShowSidebar(false);
      }
      if (showDropdown && profileIcon && !profileIcon.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSidebar, showDropdown]);

  const toggleDropdown = () => {
    if (isMobile) {
      setShowDropdown(!showDropdown);
    }
  };

  return (
    <>
      {/* Navbar container */}
      <div
        style={{
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
        }}
      >
        {/* Left: Logo */}
        <div style={{ flex: '1' }}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <img
              src={assets.logo}
              style={{ width: '160px', height: 'auto', cursor: 'pointer' }}
              alt="Hallyu Haven"
            />
          </NavLink>
        </div>

        {/* Center: Nav links for desktop */}
        {!isMobile && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '30px',
              zIndex: 1,
            }}
          >
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
                    zIndex: 2,
                  })}
                >
                  {labels[i]}
                </NavLink>
              );
            })}
          </div>
        )}

        {/* Right: Icons */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          {/* Search icon only on /collection page */}
          {location.pathname === '/collection' && (
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              style={{
                width: '25px',
                height: 'auto',
                cursor: 'pointer',
                display: showSearch ? 'none' : 'block',
              }}
              alt="Search"
            />
          )}

          {/* Profile icon and dropdown */}
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
              <div
                style={{
                  position: isMobile ? 'fixed' : 'absolute',
                  right: isMobile ? '20px' : 0,
                  top: isMobile ? '70px' : '100%',
                  backgroundColor: '#f8f8f8',
                  minWidth: '160px',
                  boxShadow: '0px 8px 16px rgba(0,0,0,0.1)',
                  zIndex: 10,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                {['My Profile', 'Orders', 'Logout'].map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: '12px 16px',
                      color: '#555',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#000')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart icon with count */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <img src={assets.cart_icon} style={{ width: '25px', height: 'auto' }} alt="Cart" />
            {cartItemsCount > 0 && (
              <div
                style={{
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
                  fontWeight: 'bold',
                }}
              >
                {cartItemsCount}
              </div>
            )}
          </div>

          {/* Mobile menu icon */}
          {isMobile && (
            <div
              className="menu-icon"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowSidebar(true)}
            >
              <img src={assets.menu_icon} style={{ width: '25px', height: 'auto' }} alt="Menu" />
            </div>
          )}
        </div>
      </div>

      {/* Search bar below navbar - only on /collection page and when showSearch is true */}
      {location.pathname === '/collection' && showSearch && (
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '15px 40px',
            backgroundColor: 'white',
            borderBottom: '1px solid #e0e0e0',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              maxWidth: '600px',
              border: '1px solid #ddd',
              borderRadius: '25px',
              padding: '8px 15px',
              position: 'relative',
            }}
          >
            {/* Search icon inside input */}
            <img
              src={assets.search_icon}
              alt="Search"
              style={{
                position: 'absolute',
                left: '15px',
                width: '16px',
                height: '16px',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />

            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '14px',
                paddingLeft: '40px',
              }}
              type="text"
              placeholder="Search products..."
            />

            {/* Close (cross) button */}
            <button
              onClick={() => {
                setShowSearch(false);
                setSearch('');
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '10px',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Close search"
            >
              <img
                src={assets.cross_icon}
                alt="Close"
                style={{ width: '16px', height: '16px' }}
              />
            </button>
          </div>
        </div>
      )}

      {/* Mobile sidebar */}
      {isMobile && showSidebar && (
        <div
          className="sidebar"
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'white',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '20px',
              borderBottom: '1px solid #eee',
            }}
          >
            <button
              onClick={() => setShowSidebar(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
              }}
              aria-label="Close sidebar"
            >
              &times;
            </button>
          </div>
          <nav
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}
          >
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
                  })}
                  onClick={() => setShowSidebar(false)}
                >
                  {labels[i]}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
