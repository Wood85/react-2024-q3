'use client';
import { useState, useContext } from 'react';
import styles from './BuggyButton.module.css';
import { ThemeContext } from './../../context/ThemeContext';

const BuggyButton = () => {
  const [count, setCount] = useState(0);

  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const handleClick = () => {
    setCount(count + 1);
  };

  if (count > 0) {
    throw new Error('Simulated error.');
  }

  return (
    <button className={`${styles.button} ${theme} button`} onClick={handleClick}>
      Call Error
    </button>
  );
};

export default BuggyButton;
