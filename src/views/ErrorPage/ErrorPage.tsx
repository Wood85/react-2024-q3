import { Link } from 'react-router-dom';
import './ErrorPage.css';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

const ErrorPage = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? 'theme-dark' : 'theme-light';

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
    <div className={`error-page ${theme}`} data-testid="error-page">
      <h1>Oops!</h1>
      <p>This is not the page you are looking for</p>
      <Link data-testid="back" to="/" className={`error-page__button ${theme} button`} onClick={getTheme}>
        Back
      </Link>
    </div>
  );
};

export default ErrorPage;
