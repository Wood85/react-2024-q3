import './Fallback.css';
import { useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

interface IFallbackProps {
  message: string;
}

const Fallback = (props: IFallbackProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? 'theme-dark' : 'theme-light';

  return <div className={`fallback ${theme}`}>{props.message}</div>;
};

export default Fallback;
