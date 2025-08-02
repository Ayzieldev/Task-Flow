import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import './Header.scss';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo" onClick={closeMobileMenu}>
            <h1>Goal Tracker</h1>
          </Link>
          
          {/* Desktop Actions */}
          <div className="header__actions desktop-only">
            <Link to="/" className="header__action-btn">
              Download
            </Link>
            <Link to="/" className="header__action-btn">
             Register
            </Link>
            <Link to="/dashboard" className="header__action-btn">
              Log In
            </Link>
            <button
              className="header__theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className={`header__hamburger mobile-only ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`header__mobile-menu mobile-only ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu__content">
            <Link to="/" className="mobile-menu__item" onClick={closeMobileMenu}>
              <span className="mobile-menu__icon">📥</span>
              Download
            </Link>
            <Link to="/" className="mobile-menu__item" onClick={closeMobileMenu}>
              <span className="mobile-menu__icon">📝</span>
              Register
            </Link>
            <Link to="/dashboard" className="mobile-menu__item" onClick={closeMobileMenu}>
              <span className="mobile-menu__icon">🔐</span>
              Log In
            </Link>
            <button
              className="mobile-menu__item mobile-menu__theme-toggle"
              onClick={() => {
                toggleTheme();
                closeMobileMenu();
              }}
            >
              <span className="mobile-menu__icon">
                {theme === 'light' ? '🌙' : '☀️'}
              </span>
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 