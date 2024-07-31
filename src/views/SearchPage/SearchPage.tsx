'use client';
import styles from './SearchPage.module.css';
import SearchForm from './../../components/SearchForm/SearchForm';
import { useAppDispatch } from './../../hooks/redux';
import { NUM_PER_PAGE } from './../../utils/constants';
import Title from './../../components/Title/Title';
import Pagination from './../../components/Pagination/Pagination';
import { FC, useEffect, useContext } from 'react';
import { useAppSelector } from './../../hooks/redux';
import { useGetCharactersMutation } from './../../services/SWAPI/SWAPI';
import InfoContainer from './../../components/InfoContainer/InfoContainer';
import ItemList from './../../components/ItemList/ItemList';
import { setCurrentCharacters } from './../../store/reducers/charactersSlice';
import FlyoutElement from './../../components/FlyoutElement/FlyoutElement';
import SwitchTheme from './../../components/SwitchTheme/SwitchTheme';
import { ThemeContext } from './../../context/ThemeContext';
import { showInfo } from './../../store/reducers/infoSlice';

const SearchPage: FC = () => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const dispatch = useAppDispatch();

  const [getCharacters] = useGetCharactersMutation();

  const searchCharacters = async (param: string) => {
    const res = await getCharacters({ req: param }).unwrap();
    dispatch(setCurrentCharacters(res));
  };

  const closeInfo = () => {
    dispatch(showInfo(false));
  };

  const count = useAppSelector((state) => state.characters.data.count);
  const showInfoCard = useAppSelector((state) => state.info.isShow);
  const results = useAppSelector((state) => state.characters.data.results);
  const selectedArr = useAppSelector((state) => state.selected.selected);

  useEffect(() => {
    if (localStorage.getItem('SW_search_req') !== null) {
      const searchReq = localStorage.getItem('SW_search_req');
      if (searchReq !== null) {
        searchCharacters(searchReq);
      }
    }
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
        {showInfoCard ? <InfoContainer /> : ''}
      </section>
      <section>{count < NUM_PER_PAGE + 1 || results === undefined ? '' : <Pagination />}</section>
      <section className={styles.flyoutContainer}>{selectedArr.length > 0 ? <FlyoutElement /> : ''}</section>
    </div>
  );
};

export default SearchPage;
