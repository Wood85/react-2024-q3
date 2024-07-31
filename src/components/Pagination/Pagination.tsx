'use client';
import styles from './Pagination.module.css';
import PageNumber from './../../components/PageNumber/PageNumber';
import { useContext } from 'react';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { useGetPageByFullAddressMutation } from './../../services/SWAPI/SWAPI';
import { pageNum, setCurrentCharacters, loading } from './../../store/reducers/charactersSlice';
import { NUM_PER_PAGE } from './../../utils/constants';
import { ThemeContext } from './../../context/ThemeContext';

const Pagination = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const count = useAppSelector((state) => state.characters.data.count);
  const prev = useAppSelector((state) => state.characters.data.previous);
  const next = useAppSelector((state) => state.characters.data.next);

  const dispatch = useAppDispatch();
  const [getPage] = useGetPageByFullAddressMutation();

  const onClickPrev = async () => {
    if (prev !== null) {
      dispatch(loading(true));
      const param = prev.slice(22);
      const page = Number(prev.slice(-1));
      const res = await getPage(param).unwrap();
      dispatch(setCurrentCharacters(res));
      dispatch(pageNum(page));
      dispatch(loading(false));
    }
  };

  const onClickNext = async () => {
    if (next !== null) {
      dispatch(loading(true));
      const param = next.slice(22);
      const page = Number(next.slice(-1));
      const res = await getPage(param).unwrap();
      dispatch(setCurrentCharacters(res));
      dispatch(pageNum(page));
      dispatch(loading(false));
    }
  };

  const countPage = Math.ceil(count / NUM_PER_PAGE);

  const pageNumbers = [];
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
