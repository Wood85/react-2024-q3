import styles from './Input.module.css';
import { ChangeEvent, useContext, useState } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

interface IInputProps {
  name: string;
  value: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: IInputProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <input
      data-testid="input"
      type="text"
      name={props.name}
      className={`${styles.input} ${theme}`}
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
    />
  );
};

export default Input;
