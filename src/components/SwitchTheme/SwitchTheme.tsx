import styles from './SwitchTheme.module.css';
import { useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

const SwitchTheme = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;
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
      className={`${styles.button} ${theme}`}
    ></button>
  );
};

export default SwitchTheme;
