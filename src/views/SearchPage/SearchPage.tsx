import './SearchPage.css';
import SearchForm from './../../components/SearchForm/SearchForm';
import { IPeople } from 'interfaces/interfaces';
import Item from './../../components/Item/Item';
import search from './../../services/SWAPI/SWAPI';
import { emptyValue } from './../../utils/constants';
import Spinner from './../../components/spinner/spinner';
import NotFound from './../../components/NotFound/NotFound';
import Title from './../../components/Title/Title';
import Pagination from './../../components/Pagination/Pagination';
import { useState, useEffect } from 'react';

const SearchPage = () => {
  const [state, setState] = useState({ value: emptyValue });
  const [isLoading, setIsLoading] = useState(false);

  const updateData = (value: IPeople[] | undefined) => {
    setState({ value: value });
  };

  useEffect(() => {
    if (localStorage.getItem('SW_search_req') !== null) {
      const searchReq = localStorage.getItem('SW_search_req');
      if (searchReq !== null) {
        setIsLoading(true);
        search(searchReq).then((res) => {
          setIsLoading(true);
          if (res !== undefined) {
            setIsLoading(false);
            setState({ value: res.results });
          } else {
            setIsLoading(false);
            setState({ value: undefined });
          }
        });
      }
    }
  }, []);

  return (
    <div className="search-page">
      <section className="search">
        <Title />
        <SearchForm class="search-form" updateData={updateData} />
      </section>
      <section className="results">
        {isLoading || (state.value !== undefined && state.value[0].name === '') ? (
          <Spinner />
        ) : state.value === undefined ? (
          <NotFound />
        ) : (
          state.value.map((item) => (
            <Item
              key={crypto.randomUUID()}
              name={item.name}
              gender={item.gender}
              birthYear={item.birth_year}
              height={item.height}
              mass={item.mass}
              hairColor={item.hair_color}
              skinColor={item.skin_color}
              eyeColor={item.eye_color}
            />
          ))
        )}
      </section>
      <section className="pagination__container">
        {isLoading || (state.value !== undefined && state.value[0].name === '') ? (
          ''
        ) : state.value === undefined ? (
          ''
        ) : (
          <Pagination count={Math.floor(state.value.length / 10) + 1} />
        )}
        {/* {isLoading || (state.value !== undefined && state.value[0].name === '') ? (
          ''
        ) : (
          <Pagination count={state.value / 10} />
        )} */}
      </section>
    </div>
  );
};

export default SearchPage;
