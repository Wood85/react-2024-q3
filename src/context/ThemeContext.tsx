'use client';
import { ReactNode, createContext, useState } from 'react';

export const ThemeContext = createContext<{ isDarkTheme: boolean; toggleTheme: () => void }>({
  isDarkTheme: false,
  toggleTheme: () => {},
});

interface IThemeProviderProps {
  children?: ReactNode;
}

const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme((prevTheme) => !prevTheme);

  return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
