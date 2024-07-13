import './SearchPage.css';
import SearchForm from './../../components/SearchForm/SearchForm';
import { IResponse } from 'interfaces/interfaces';
import Item from './../../components/Item/Item';
import { search, searchFullAddress } from './../../services/SWAPI/SWAPI';
import { emptyData, NUM_PER_PAGE } from './../../utils/constants';
import Spinner from './../../components/spinner/spinner';
import NotFound from './../../components/NotFound/NotFound';
import Title from './../../components/Title/Title';
import Pagination from './../../components/Pagination/Pagination';
import { useState, useEffect, MouseEvent } from 'react';

const SearchPage = () => {
  const [state, setState] = useState({ value: emptyData });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);

  const updateData = (value: IResponse) => {
    setState({ value: value });
  };

  useEffect(() => {
    if (localStorage.getItem('SW_search_req') !== null) {
      const searchReq = localStorage.getItem('SW_search_req');
      if (searchReq !== null) {
        setIsLoading(true);
        search(searchReq).then((res) => {
          setIsLoading(false);
          setState({ value: res });
        });
      }
    }
  }, []);

  function clickPageNumber(num: number) {
    const req = localStorage.getItem('SW_search_req');
    if (req !== null) {
      if (
        (state.value.next !== null && Number(state.value.next[state.value.next.length - 1]) - 1 !== num) ||
        (state.value.previous !== null && Number(state.value.previous[state.value.previous.length - 1]) + 1 !== num)
      ) {
        setIsLoading(true);
        setSelectedPage(num);
        search(req, num).then((res) => {
          setIsLoading(false);
          setState({ value: res });
        });
      }
    }
  }

  function clickPrevPage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (state.value.previous !== null) {
      setIsLoading(true);
      setSelectedPage(Number(state.value.previous[state.value.previous.length - 1]));
      searchFullAddress(state.value.previous).then((res) => {
        setIsLoading(false);
        setState({ value: res });
      });
    }
  }

  function clickNextPage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (state.value.next !== null) {
      setIsLoading(true);
      setSelectedPage(Number(state.value.next[state.value.next.length - 1]));
      searchFullAddress(state.value.next).then((res) => {
        setIsLoading(false);
        setState({ value: res });
      });
    }
  }

  return (
    <div className="search-page">
      <section className="search">
        <Title />
        <SearchForm class="search-form" updateData={updateData} />
      </section>
      <section className="results">
        {isLoading || state.value.count === -1 ? (
          <Spinner />
        ) : state.value.count === 0 ? (
          <NotFound />
        ) : (
          state.value.results.map((item) => (
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
        {state.value.count < NUM_PER_PAGE + 1 ? (
          ''
        ) : (
          <Pagination
            count={Math.floor(state.value.count / NUM_PER_PAGE) + 1}
            selectedPage={selectedPage}
            onClick={clickPageNumber}
            onClickPrev={clickPrevPage}
            onClickNext={clickNextPage}
          />
        )}
      </section>
    </div>
  );
};

export default SearchPage;
