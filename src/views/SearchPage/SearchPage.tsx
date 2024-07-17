import './SearchPage.css';
import SearchForm from './../../components/SearchForm/SearchForm';
import { IResponse } from 'interfaces/interfaces';
import { search, searchFullAddress, searchCharacter } from './../../services/SWAPI/SWAPI';
import { emptyCharacter, emptyData, NUM_PER_PAGE } from './../../utils/constants';
import Title from './../../components/Title/Title';
import Pagination from './../../components/Pagination/Pagination';
import { useState, useEffect, MouseEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import Fallback from './../../components/Fallback/Fallback';
import InfoContainer from './../../components/InfoContainer/InfoContainer';
import ItemList from './../../components/ItemList/ItemList';

const SearchPage = () => {
  const [state, setState] = useState({ value: emptyData });
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState(emptyCharacter);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') || '';

  const pageQuery = searchParams.get('page') || '1';

  const [selectedPage, setSelectedPage] = useState(Number(pageQuery));

  const updateData = (value: IResponse, loading: boolean, page: number) => {
    setState({ value: value });
    setSelectedPage(page);
    setIsLoading(loading);
    setShowInfo(false);
    setInfo(emptyCharacter);
  };

  const onClickItem = (url: string) => {
    setShowInfo(true);
    setIsInfoLoading(true);
    searchCharacter(url)
      .then((res) => {
        setIsInfoLoading(false);
        setInfo(res);
        setSearchParams({ character: res.url.slice(29, -1) });
      })
      .catch(() => <Fallback message="Something went wrong" />);
  };

  const handleCloseClick = () => {
    setShowInfo(false);
    const req = localStorage.getItem('SW_search_req');
    if (req !== null) {
      setSearchParams({ search: req, page: `${selectedPage}` });
    }
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
        setShowInfo(false);
        setInfo(emptyCharacter);
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
      setShowInfo(false);
      setInfo(emptyCharacter);
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
      setShowInfo(false);
      setInfo(emptyCharacter);
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
    <div className="search-page" data-testid="search-page" onClick={handleCloseClick}>
      <section className="search">
        <Title />
        <SearchForm class="search-form" updateData={updateData} />
      </section>
      <section className="results" onClick={handleCloseClick}>
        <ItemList isLoading={isLoading} count={state.value.count} results={state.value.results} onClick={onClickItem} />
        {showInfo ? <InfoContainer info={info} isLoading={isInfoLoading} handleCloseClick={handleCloseClick} /> : ''}
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
