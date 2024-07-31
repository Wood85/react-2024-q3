'use client';
import styles from './PageNumber.module.css';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { useGetCharactersMutation } from './../../services/SWAPI/SWAPI';
import { pageNum, setCurrentCharacters, loading } from './../../store/reducers/charactersSlice';
import { useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

export interface IPageNumberProps {
  num: number;
}
const PageNumber = (props: IPageNumberProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const { num } = props;
  const dispatch = useAppDispatch();

  function selectPage() {
    dispatch(pageNum(num));
  }

  const [getCharacters] = useGetCharactersMutation();

  const getPageWithCharacters = async () => {
    dispatch(loading(true));
    const req = localStorage.getItem('SW_search_req');
    if (req !== null) {
      const res = await getCharacters({ req, page: num }).unwrap();
      dispatch(setCurrentCharacters(res));
      dispatch(loading(false));
    }
  };

  const selectedPage = useAppSelector((state) => state.characters.pageNum);

  return (
    <>
      {selectedPage === num ? (
        <div
          className={`${styles.pageNumber} ${styles.pageNumberActive} ${theme}`}
          onClick={(e) => {
            e.stopPropagation();
            selectPage();
            getPageWithCharacters();
          }}
        >
          {num}
        </div>
      ) : (
        <div
          className={`${styles.pageNumber} ${theme}`}
          onClick={(e) => {
            e.stopPropagation();
            selectPage();
            getPageWithCharacters();
          }}
        >
          {num}
        </div>
      )}
    </>
  );
};

export default PageNumber;
