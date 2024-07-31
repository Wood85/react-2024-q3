'use client';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

const ErrorPage = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  function getTheme() {
    if (localStorage.getItem('SW_theme') !== null) {
      const theme = localStorage.getItem('SW_theme');
      if (theme !== null) {
        if (theme === 'dark') {
          toggleTheme();
        }
      }
    }
  }

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <div className={`${styles.page} ${theme}`} data-testid="error-page">
      <h1>Oops!</h1>
      <p>This is not the page you are looking for</p>
      <Link data-testid="back" to="/" className={`${styles.button} ${theme} button`} onClick={getTheme}>
        Back
      </Link>
    </div>
  );
};

export default ErrorPage;
