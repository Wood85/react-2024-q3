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
import { useSearchParams } from 'react-router-dom';
import Fallback from './../../components/Fallback/Fallback';

const SearchPage = () => {
  const [state, setState] = useState({ value: emptyData });
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';

  const pageQuery = searchParams.get('page') || '1';

  const [selectedPage, setSelectedPage] = useState(Number(pageQuery));

  const updateData = (value: IResponse, loading: boolean, page: number) => {
    setState({ value: value });
    setSelectedPage(page);
    setIsLoading(loading);
  };

  useEffect(() => {
    if (localStorage.getItem('SW_search_req') !== null) {
      const searchReq = searchQuery || localStorage.getItem('SW_search_req');
      if (searchReq !== null) {
        setIsLoading(true);
        localStorage.setItem('SW_search_req', searchReq);
        search(searchReq, Number(pageQuery))
          .then((res) => {
            setIsLoading(false);
            setState({ value: res });
            setSearchParams({ search: searchReq, page: pageQuery });
          })
          .catch(() => {
            setIsLoading(false);
            <Fallback message="Something went wrong" />;
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
          setSearchParams({ search: req, page: `${num}` });
        });
      }
    }
  }

  function clickPrevPage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (state.value.previous !== null) {
      setIsLoading(true);
      const pageNum = state.value.previous[state.value.previous.length - 1];
      setSelectedPage(Number(pageNum));
      searchFullAddress(state.value.previous).then((res) => {
        setIsLoading(false);
        setState({ value: res });
        const req = localStorage.getItem('SW_search_req');
        if (req !== null) {
          setSearchParams({ search: req, page: pageNum });
        }
      });
    }
  }

  function clickNextPage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (state.value.next !== null) {
      setIsLoading(true);
      const pageNum = state.value.next[state.value.next.length - 1];
      setSelectedPage(Number(pageNum));
      searchFullAddress(state.value.next).then((res) => {
        setIsLoading(false);
        setState({ value: res });
        const req = localStorage.getItem('SW_search_req');
        if (req !== null) {
          setSearchParams({ search: req, page: pageNum });
        }
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
        ) : state.value.results === undefined ? (
          <Fallback message="Invalid request" />
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
        {state.value.count < NUM_PER_PAGE + 1 || state.value.results === undefined ? (
          ''
        ) : (
          <Pagination
            count={Math.ceil(state.value.count / NUM_PER_PAGE)}
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
