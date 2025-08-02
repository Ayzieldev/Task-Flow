import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import './Header.scss';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            <h1>Goal Tracker</h1>
          </Link>
          
          {/* Desktop Actions */}
          <div className="header__actions">
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
        </div>
      </div>
    </header>
  );
};

export default Header; 