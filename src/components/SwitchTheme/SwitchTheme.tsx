import styles from './SwitchTheme.module.css';
import { useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';
import Cookies from 'js-cookie';

const SwitchTheme = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;
  return (
    <button
      data-testid="switch"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleTheme();
        if (isDarkTheme) {
          Cookies.set('theme', 'light', { expires: 7 });
        } else {
          Cookies.set('theme', 'dark', { expires: 7 });
        }
      }}
      className={`${styles.button} ${theme}`}
    ></button>
  );
};

export default SwitchTheme;
