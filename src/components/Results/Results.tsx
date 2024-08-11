'use client';
import styles from './Results.module.css';
import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { IPeople, IResponse } from '../../interfaces/interfaces';
import { NUM_PER_PAGE } from '../../utils/constants';
import NotFound from '../NotFound/NotFound';
import Item from '../Item/Item';
import DetailsContainer from '../DetailsContainer/DetailsContainer';
import Details from '../Details/Details';
import Pagination from '../Pagination/Pagination';
import FlyoutElement from '../FlyoutElement/FlyoutElement';
import { useAppSelector } from './../../hooks/redux';
import Title from '../Title/Title';
import SearchForm from '../SearchForm/SearchForm';
import SwitchTheme from '../SwitchTheme/SwitchTheme';
import { ThemeContext } from './../../context/ThemeContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  data: IResponse;
  details: IPeople | null;
  search: RequestCookie | undefined;
  theme: RequestCookie | undefined;
}

const Results = (props: Props) => {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const router = useRouter();

  useEffect(() => {
    if (props.theme?.value === 'dark') {
      toggleTheme();
    }

    router.push(`?search=${props.search?.value}&page=1`);
  }, []);

  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const selectedArr = useAppSelector((state) => state.selected.selected);
  const pageNum = Math.ceil(props.data.count / NUM_PER_PAGE);
  return (
    <div className={`${styles.wrap} ${theme}`}>
      <section className="search">
        <Title />
        <SearchForm />
        <SwitchTheme />
      </section>
      <main className="main">
        <div className="app">
          <div className="page" data-testid="search-page">
            <section className="results">
              <div className="items">
                {props.data.count === 0 ? (
                  <NotFound />
                ) : (
                  props.data.results.map((item: IPeople) => {
                    return <Item key={crypto.randomUUID()} name={item.name} gender={item.gender} url={item.url} />;
                  })
                )}
              </div>
              {props.details !== null ? (
                <DetailsContainer>
                  <Details info={props.details} />
                </DetailsContainer>
              ) : (
                ''
              )}
            </section>
            <section>
              {props.data.count < NUM_PER_PAGE + 1 || props.data.results === undefined ? (
                ''
              ) : (
                <Pagination pageNum={pageNum} />
              )}
            </section>
            <section className="flyoutContainer">{selectedArr.length > 0 ? <FlyoutElement /> : ''}</section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Results;
