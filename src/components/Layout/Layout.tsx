import styles from './Layout.module.css';
import SearchForm from './../SearchForm/SearchForm';
import Title from './../Title/Title';
import SwitchTheme from './../SwitchTheme/SwitchTheme';
import { FC, ReactNode, useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;
  return (
    <>
      <section className={`${styles.search} ${theme}`}>
        <Title />
        <SearchForm />
        <SwitchTheme />
      </section>
      <main className={`${styles.main} ${theme}`}>{children}</main>
    </>
  );
};

export default Layout;
