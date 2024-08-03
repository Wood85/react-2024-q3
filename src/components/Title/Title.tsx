import styles from './Title.module.css';
import { useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

const Title = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.logo}></div>
      <h1 className={styles.text}>find your character</h1>
    </div>
  );
};

export default Title;
