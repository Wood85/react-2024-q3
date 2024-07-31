'use client';
import styles from './Fallback.module.css';
import { useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

interface IFallbackProps {
  message: string;
}

const Fallback = (props: IFallbackProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  return <div className={`${styles.fallback} ${theme}`}>{props.message}</div>;
};

export default Fallback;
