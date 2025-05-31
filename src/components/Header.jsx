import React from 'react';
import { Link } from 'react-scroll';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/usePreferences';

// ヘッダーコンポーネント
function Header({ darkMode, toggleDarkMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    setIsScrolled(scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDarkMode();
      }
    },
    [toggleDarkMode]
  );

  const scrollOptions = prefersReducedMotion
    ? { duration: 0 }
    : {
        smooth: true,
        duration: 500,
        offset: -80,
      };

  return (
    <header
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      role="banner"
    >
      <nav
        className="nav container"
        role="navigation"
        aria-label="メインナビゲーション"
      >
        <div className="logo">
          <Link
            to="top"
            {...scrollOptions}
            className="logo-link"
            tabIndex={0}
            aria-label="トップへ戻る"
          >
            tawashi
          </Link>
        </div>
        <ul className="nav-list" role="menubar">
          {['experience', 'skills', 'projects', 'contact'].map((item) => (
            <li key={item} role="none">
              <Link
                to={item}
                {...scrollOptions}
                className="nav-link"
                role="menuitem"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const element = document.getElementById(item);
                    element?.scrollIntoView(scrollOptions);
                  }
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
          <li role="none">
            <button
              onClick={toggleDarkMode}
              onKeyPress={handleKeyPress}
              className="theme-toggle"
              aria-label={`${darkMode ? 'ライト' : 'ダーク'}モードに切り替え`}
              role="switch"
              aria-checked={darkMode}
            >
              {darkMode ? (
                <FaSun aria-hidden="true" />
              ) : (
                <FaMoon aria-hidden="true" />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default React.memo(Header);
