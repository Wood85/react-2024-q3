import styles from './Pagination.module.css';
import PageNumber from './../../components/PageNumber/PageNumber';
import { useContext } from 'react';
import { useAppSelector } from './../../hooks/redux';
import { NUM_PER_PAGE } from './../../utils/constants';
import { ThemeContext } from './../../context/ThemeContext';
import { useSearchParams, useRouter } from 'next/navigation';

const Pagination = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const search = useSearchParams();
  const searchQuery = search.get('search') ? search.get('search') : null;
  const pageQuery = search.get('page') ? search.get('page') : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const detailsQuery = search.get('details') ? search.get('details') : null;
  const { push } = useRouter();

  const count = useAppSelector((state) => state.characters.data.count);

  const onClickPrev = () => {
    if (pageQuery !== null && Number(pageQuery) > 1) {
      if (detailsQuery !== null) {
        push(`?search=${encodedSearchQuery}&page=${Number(pageQuery) - 1}&details=${detailsQuery}`);
      } else {
        push(`?search=${encodedSearchQuery}&page=${Number(pageQuery) - 1}`);
      }
    }
  };

  const onClickNext = () => {
    if (pageQuery !== null && Number(pageQuery) < pageNumbers[pageNumbers.length - 1]) {
      if (detailsQuery !== null) {
        push(`?search=${encodedSearchQuery}&page=${Number(pageQuery) + 1}&details=${detailsQuery}`);
      } else {
        push(`?search=${encodedSearchQuery}&page=${Number(pageQuery) + 1}`);
      }
    }
  };

  const countPage = Math.ceil(count / NUM_PER_PAGE);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= countPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.pagination} data-testid="pagination">
      <button
        className={`${styles.prev} ${theme} button`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClickPrev();
        }}
      >
        {''}
        &lt;&lt; prev
      </button>
      <div className={styles.pageNumbers}>
        {pageNumbers.map((item: number) => (
          <PageNumber key={crypto.randomUUID()} num={item} />
        ))}
      </div>
      <button
        className={`${styles.next} ${theme} button`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClickNext();
        }}
      >
        next &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
