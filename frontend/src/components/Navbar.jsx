import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false); // State for controlling sidebar visibility
    // Removed isSearchVisible from useContext as it will always be true or controlled differently
    const { search, setSearch, setIsSearchVisible, getCartCount } = useContext(ShopContext);
    const location = useLocation();

    // State to manage search bar visibility
    const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const sidebar = document.querySelector('.sidebar');
            const menuIcon = document.querySelector('.menu-icon'); // Select the menu icon
            const profileIcon = document.querySelector('.profile-icon');
            // Assuming search bar and its toggle are not within these elements for outside click detection

            // Close sidebar if click is outside sidebar and menu icon
            if (sidebar && !sidebar.contains(event.target) && menuIcon && !menuIcon.contains(event.target)) {
                setShowSidebar(false);
            }
            // Close profile dropdown if click is outside dropdown and profile icon
            if (showDropdown && profileIcon && !profileIcon.contains(event.target)) {
                setShowDropdown(false);
            }

            // You might want to close the search input when clicking outside it too,
            // but the current structure might need specific refactoring for that.
            // For now, we're focusing on keeping the icon present.
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDropdown, showSidebar]);

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev);
    };

    const toggleSearchInput = () => {
        setIsSearchInputVisible(prev => !prev);
        // Clear search when closing the input
        if (isSearchInputVisible) {
            setSearch('');
        }
    };


    // Array for navigation links to avoid repetition
    const navLinks = [
        { path: '/', label: 'HOME' },
        { path: '/collection', label: 'COLLECTION' },
        { path: '/about', label: 'ABOUT' },
        { path: '/contact', label: 'CONTACT' },
    ];

    const currentCartCount = getCartCount(); // Get the current cart count from context

    return (
        <>
            {/* Main Navbar Container */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 40px', maxWidth: '1200px', margin: '0 auto', width: '100%', backgroundColor: 'white', borderBottom: '1px solid #e0e0e0', height: '80px' }}>
                {/* Logo Section */}
                <div style={{ flex: '1' }}>
                    <NavLink to="/">
                        <img src={assets.logo} alt="Logo" style={{ width: '160px' }} />
                    </NavLink>
                </div>

                {/* Desktop Navigation Links */}
                {!isMobile && (
                    <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '30px' }}>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                style={({ isActive }) => ({
                                    color: isActive ? '#000' : '#666',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    borderBottom: isActive ? '2px solid black' : 'none',
                                    paddingBottom: '4px',
                                    transition: 'color 0.3s, border-bottom 0.3s',
                                    whiteSpace: 'nowrap' // Prevent wrapping
                                })}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                )}

                {/* Right Section: Icons */}
                <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end', gap: '20px', alignItems: 'center' }}>

                    {/* ALWAYS SHOW SEARCH ICON */}
                    <img
                        onClick={toggleSearchInput} // Toggle the search input visibility
                        src={assets.search_icon}
                        alt="Search"
                        style={{
                            width: '25px',
                            cursor: 'pointer',
                            // The icon itself is now always visible, it just toggles the input bar
                        }}
                    />


                    {/* Profile Icon and Dropdown */}
                    <div className="profile-icon" onClick={toggleDropdown} style={{ position: 'relative', cursor: 'pointer' }}>
                        <img src={assets.profile_icon} alt="Profile" style={{ width: '25px' }} />
                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                background: '#fff',
                                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                                borderRadius: '4px',
                                minWidth: '120px',
                                zIndex: 100 // Ensure dropdown is above other content
                            }}>
                                {['My Profile', 'Orders', 'Logout'].map((item) => (
                                    <div key={item} style={{
                                        padding: '10px 15px',
                                        cursor: 'pointer',
                                        color: '#555',
                                        whiteSpace: 'nowrap'
                                    }}>{item}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Icon with Item Count - Now wrapped in NavLink */}
                    <NavLink to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ position: 'relative', cursor: 'pointer' }}>
                            <img src={assets.cart_icon} alt="Cart" style={{ width: '25px' }} />
                            {currentCartCount > 0 && (
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
                                    fontSize: '10px'
                                }}>
                                    {currentCartCount}
                                </div>
                            )}
                        </div>
                    </NavLink>

                    {/* Hamburger Menu Icon (Mobile Only) */}
                    {isMobile && (
                        <div className="menu-icon" onClick={toggleSidebar} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                            <img src={assets.menu_icon} alt="Menu" style={{ width: '25px' }} />
                        </div>
                    )}
                </div>
            </div>

            {/* Search Bar - NOW ALWAYS VISIBLE WHEN TOGGLED */}
            {isSearchInputVisible && ( // Use isSearchInputVisible state
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
                            backgroundColor: 'white',
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
                    </div>

                    {/* Cross icon outside the input box */}
                    <button
                        onClick={() => {
                            setSearch('');
                            setIsSearchInputVisible(false); // Close the search input
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            marginLeft: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        aria-label="Close Search"
                    >
                        <img
                            src={assets.cross_icon}
                            alt="Close"
                            style={{
                                width: '18px',
                                height: '18px',
                            }}
                        />
                    </button>
                </div>
            )}

            {/* Mobile Sidebar */}
            {isMobile && showSidebar && (
                <div className="sidebar" style={{
                    position: 'fixed',
                    top: '80px', // Below the Navbar
                    right: 0,
                    width: '250px',
                    height: 'calc(100vh - 80px)', // Full height minus navbar
                    background: '#fff',
                    boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
                    zIndex: 99, // Below profile dropdown, above main content
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    gap: '15px',
                    animation: 'slideInRight 0.3s forwards' // Optional: add a slide-in animation
                }}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setShowSidebar(false)} // Close sidebar on link click
                            style={({ isActive }) => ({
                                color: isActive ? '#000' : '#666',
                                fontWeight: 500,
                                textDecoration: 'none',
                                padding: '10px 0',
                                borderBottom: '1px solid #eee', // Separator for links
                                transition: 'color 0.3s'
                            })}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            )}

            {/* Optional: Add CSS for slideInRight animation if desired */}
            <style jsx>{`
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </>
    );
};

export default Navbar;

