import styles from './PageNumber.module.css';
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

  const search = useSearchParams();

  const query = search ? search.get('search') : null;

  const encodedSearchQuery = encodeURI(query || '');

  const pageQuery = search.get('page') ? search.get('page') : null;

  const detailsQuery = search.get('details') ? search.get('details') : null;

  const { push } = useRouter();

  const getPageWithCharacters = () => {
    if (detailsQuery !== null) {
      push(`?search=${encodedSearchQuery}&page=${num}&details=${detailsQuery}`);
    } else {
      push(`?search=${encodedSearchQuery}&page=${num}`);
    }
  };

  return (
    <>
      {Number(pageQuery) === num ? (
        <div
          className={`${styles.pageNumber} ${styles.pageNumberActive} ${theme}`}
          onClick={(e) => {
            e.stopPropagation();
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
