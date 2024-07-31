'use client';
import styles from './App.module.css';
import SearchPage from './views/SearchPage/SearchPage';
// import store from './store/store.ts';
// import ThemeProvider from './context/ThemeContext.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { FC, useEffect, useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { useGetCharactersMutation } from './services/SWAPI/SWAPI';
import { useAppDispatch } from './hooks/redux';
import { setCurrentCharacters } from './store/reducers/charactersSlice';
// import { Provider } from 'react-redux';

const App: FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const dispatch = useAppDispatch();
  const [getCharacters] = useGetCharactersMutation();
  useEffect(() => {
    if (!localStorage.getItem('SW_search_req')) {
      localStorage.setItem('SW_search_req', '');
      (async () => {
        const res = await getCharacters({ req: '' }).unwrap();
        dispatch(setCurrentCharacters(res));
      })();
    }
  }, []);

  return (
    <div className={`${styles.app} ${theme}`} data-testid="app">
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    </div>
  );
};

export default App;
