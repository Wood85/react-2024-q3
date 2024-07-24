import './Pagination.css';
import PageNumber from './../../components/PageNumber/PageNumber';
import { MouseEvent, useContext } from 'react';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { useGetPageByFullAddressMutation } from './../../services/SWAPI/SWAPI';
import { pageNum, setCurrentCharacters } from './../../store/reducers/charactersSlice';
import { NUM_PER_PAGE } from './../../utils/constants';
import { ThemeContext } from './../../context/ThemeContext';

const Pagination = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? 'theme-dark' : 'theme-light';

  const count = useAppSelector((state) => state.characters.data.count);
  const prev = useAppSelector((state) => state.characters.data.previous);
  const next = useAppSelector((state) => state.characters.data.next);

  const dispatch = useAppDispatch();
  const [getPage] = useGetPageByFullAddressMutation();

  const onClickPrev = async (event: MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    if (prev !== null) {
      const param = prev.slice(22);
      const page = Number(prev.slice(-1));
      const res = await getPage(param).unwrap();
      dispatch(setCurrentCharacters(res));
      dispatch(pageNum(page));
    }
  };

  const onClickNext = async () => {
    if (next !== null) {
      const param = next.slice(22);
      const page = Number(next.slice(-1));
      const res = await getPage(param).unwrap();
      dispatch(setCurrentCharacters(res));
      dispatch(pageNum(page));
    }
  };

  const countPage = Math.ceil(count / NUM_PER_PAGE);

  const pageNumbers = [];
  for (let i = 1; i <= countPage; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <button className={`pagination__prev ${theme} button`} onClick={onClickPrev}>
        {''}
        &lt;&lt; prev
      </button>
      <div className="pagination__page-numbers">
        {pageNumbers.map((item: number) => (
          <PageNumber key={crypto.randomUUID()} num={item} />
        ))}
      </div>
      <button
        className={`pagination__next ${theme} button`}
        onClick={(e) => {
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
