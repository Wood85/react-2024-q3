import './SearchPage.css';
import SearchForm from './../../components/SearchForm/SearchForm';
import { useAppDispatch } from './../../hooks/redux';
import { NUM_PER_PAGE } from './../../utils/constants';
import Title from './../../components/Title/Title';
import Pagination from './../../components/Pagination/Pagination';
import { useEffect } from 'react';
import { useAppSelector } from './../../hooks/redux';
import { useGetCharactersMutation } from './../../services/SWAPI/SWAPI';
import InfoContainer from './../../components/InfoContainer/InfoContainer';
import ItemList from './../../components/ItemList/ItemList';
import { setCurrentCharacters } from './../../store/reducers/charactersSlice';
import FlyoutElement from './../../components/FlyoutElement/FlyoutElement';

const SearchPage = () => {
  const dispatch = useAppDispatch();

  const [getCharacters] = useGetCharactersMutation();

  const searchCharacters = async (param: string) => {
    const res = await getCharacters({ req: param }).unwrap();
    dispatch(setCurrentCharacters(res));
  };

  const count = useAppSelector((state) => state.characters.data.count);
  const showInfo = useAppSelector((state) => state.info.isShow);
  const results = useAppSelector((state) => state.characters.data.results);
  const selectedArr = useAppSelector((state) => state.selected.selected);

  useEffect(() => {
    if (localStorage.getItem('SW_search_req') !== null) {
      const searchReq = localStorage.getItem('SW_search_req');
      if (searchReq !== null) {
        searchCharacters(searchReq);
      }
    }
  }, []);

  return (
    <div className="search-page" data-testid="search-page">
      <section className="search">
        <Title />
        <SearchForm class="search-form" />
      </section>
      <section className="results">
        <ItemList />
        {showInfo ? <InfoContainer /> : ''}
      </section>
      <section className="pagination__container">
        {count < NUM_PER_PAGE + 1 || results === undefined ? '' : <Pagination />}
      </section>
      <section className="flyout-container">{selectedArr.length > 0 ? <FlyoutElement /> : ''}</section>
    </div>
  );
};

export default SearchPage;
