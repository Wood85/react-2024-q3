import './PageNumber.css';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { useGetCharactersMutation } from './../../services/SWAPI/SWAPI';
import { pageNum, setCurrentCharacters } from './../../store/reducers/charactersSlice';
import { useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

export interface IPageNumberProps {
  num: number;
}
const PageNumber = (props: IPageNumberProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? 'theme-dark' : 'theme-light';

  const { num } = props;
  const dispatch = useAppDispatch();

  function selectPage() {
    dispatch(pageNum(num));
  }

  const [getCharacters] = useGetCharactersMutation();

  const getPageWithCharacters = async () => {
    const req = localStorage.getItem('SW_search_req');
    if (req !== null) {
      const res = await getCharacters({ req, page: num }).unwrap();
      dispatch(setCurrentCharacters(res));
    }
  };

  const selectedPage = useAppSelector((state) => state.characters.pageNum);

  return (
    <>
      {selectedPage === num ? (
        <div
          className={`pagination__page-number pagination__page-number_active ${theme}`}
          onClick={() => {
            selectPage();
            getPageWithCharacters();
          }}
        >
          {num}
        </div>
      ) : (
        <div
          className={`pagination__page-number ${theme}`}
          onClick={() => {
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
