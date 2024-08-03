import styles from './App.module.css';
import SearchPage from './views/SearchPage/SearchPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { FC, useContext, useEffect } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const App: FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const { push } = useRouter();

  const search = useSearchParams();

  const searchQuery = search.get('search') ? search.get('search') : null;

  const encodedSearchQuery = encodeURI(searchQuery || '');

  useEffect(() => {
    if (encodedSearchQuery === '') {
      if (!localStorage.getItem('SW_search_req')) {
        localStorage.setItem('SW_search_req', '');
        push(`?search=${encodedSearchQuery}&page=1`);
      }
      if (localStorage.getItem('SW_search_req')) {
        const lSValue = localStorage.getItem('SW_search_req');
        if (lSValue !== null) {
          push(`?search=${lSValue}&page=1`);
        }
      }
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
