import styles from './PageNumber.module.css';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { pageNum } from './../../store/reducers/charactersSlice';
import { useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';
import { useSearchParams, useRouter } from 'next/navigation';

export interface IPageNumberProps {
  num: number;
}
const PageNumber = (props: IPageNumberProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const { num } = props;
  const dispatch = useAppDispatch();

  const search = useSearchParams();

  const query = search ? search.get('search') : null;

  const encodedSearchQuery = encodeURI(query || '');

  const detailsQuery = search.get('details') ? search.get('details') : null;

  const { push } = useRouter();

  function selectPage() {
    dispatch(pageNum(num));
  }

  const getPageWithCharacters = () => {
    if (detailsQuery !== null) {
      push(`?search=${encodedSearchQuery}&page=${num}&details=${detailsQuery}`);
    } else {
      push(`?search=${encodedSearchQuery}&page=${num}`);
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
