import './SwitchTheme.css';
import { useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

const SwitchTheme = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleTheme();
        if (isDarkTheme) {
          localStorage.setItem('SW_theme', 'light');
        } else {
          localStorage.setItem('SW_theme', 'dark');
        }
      }}
      className={`theme-button ${isDarkTheme ? 'theme-button_dark' : 'theme-button_light'}`}
    ></button>
  );
};

export default SwitchTheme;
