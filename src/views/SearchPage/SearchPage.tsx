import { useSearchParams } from 'next/navigation';
import styles from './SearchPage.module.css';
import SearchForm from './../../components/SearchForm/SearchForm';
import { NUM_PER_PAGE } from './../../utils/constants';
import Title from './../../components/Title/Title';
import Pagination from './../../components/Pagination/Pagination';
import { FC, useEffect, useContext } from 'react';
import { useAppSelector } from './../../hooks/redux';
import InfoContainer from './../../components/InfoContainer/InfoContainer';
import ItemList from './../../components/ItemList/ItemList';
import FlyoutElement from './../../components/FlyoutElement/FlyoutElement';
import SwitchTheme from './../../components/SwitchTheme/SwitchTheme';
import { ThemeContext } from './../../context/ThemeContext';
import { useRouter } from 'next/router';

const SearchPage: FC = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const search = useSearchParams();
  const searchQuery = search.get('search') ? search.get('search') : null;
  const pageQuery = search.get('page') ? search.get('page') : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const detailsQuery = search.get('details') ? search.get('details') : null;

  const { push } = useRouter();

  const closeInfo = () => {
    push(`?search=${encodedSearchQuery}&page=${Number(pageQuery)}`);
  };

  const count = useAppSelector((state) => state.characters.data.count);
  const results = useAppSelector((state) => state.characters.data.results);
  const selectedArr = useAppSelector((state) => state.selected.selected);

  useEffect(() => {
    if (localStorage.getItem('SW_theme') !== null) {
      const theme = localStorage.getItem('SW_theme');
      if (theme !== null) {
        if (theme === 'dark') {
          toggleTheme();
        }
      }
    }
  }, []);

  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  return (
    <div className={`${styles.page} ${theme}`} data-testid="search-page" onClick={closeInfo}>
      <section className={styles.search}>
        <Title />
        <SearchForm />
        <SwitchTheme />
      </section>
      <section className={styles.results}>
        <ItemList />
        {detailsQuery !== null ? <InfoContainer /> : ''}
      </section>
      <section>{count < NUM_PER_PAGE + 1 || results === undefined ? '' : <Pagination />}</section>
      <section className={styles.flyoutContainer}>{selectedArr.length > 0 ? <FlyoutElement /> : ''}</section>
    </div>
  );
};

export default SearchPage;
