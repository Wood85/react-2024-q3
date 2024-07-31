'use client';
import styles from './Input.module.css';
import { ChangeEvent, useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

interface IInputProps {
  name: string;
  value: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: IInputProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  return (
    <input
      data-testid="input"
      type="text"
      name={props.name}
      className={`${styles.input} ${theme}`}
      value={props.value}
      onChange={props.handleInputChange}
    />
  );
};

export default Input;
