import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { useAppSelector } from './../hooks/redux';
import { ThemeContext } from './../context/ThemeContext';
import { IPeople, IResponse } from './../interfaces/interfaces.ts';
import { useSearchParams } from 'next/navigation';
import Item from './../components/Item/Item.tsx';
import Head from 'next/head';
import NotFound from './../components/NotFound/NotFound.tsx';
import DetailsContainer from './../components/DetailsContainer/DetailsContainer.tsx';
import Details from './../components/Details/Details.tsx';
import { NUM_PER_PAGE } from './../utils/constants.ts';
import Pagination from './../components/Pagination/Pagination.tsx';
import FlyoutElement from './../components/FlyoutElement/FlyoutElement.tsx';
import { useRouter } from 'next/navigation';
import Layout from './../components/Layout/Layout.tsx';
import Router from 'next/router';
import Spinner from './../components/spinner/spinner.tsx';
import ErrorBoundary from './../components/ErrorBoundary/ErrorBoundary.tsx';

export default function Page({
  searchParam,
  title,
  info,
  pageNum,
  themeSet,
  searchSet,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? 'darkTheme' : 'lightTheme';
  const router = useRouter();
  const searchParams = useSearchParams();
  const details = searchParams.get('details');
  const selectedArr = useAppSelector((state) => state.selected.selected);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.push(`?search=${searchSet}&page=1`);
  }, []);

  useEffect(() => {
    if (themeSet === 'dark') {
      toggleTheme();
    }

    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/yoda.png" />
        <title>{title}</title>
      </Head>
      <ErrorBoundary>
        <Layout>
          {loading ? (
            <Spinner />
          ) : (
            <div className={`app ${theme}`}>
              <div className={`page ${theme}`} data-testid="search-page">
                <section className="results">
                  <div className="items">
                    {searchParam.count === 0 ? (
                      <NotFound />
                    ) : (
                      searchParam.results.map((item: IPeople) => {
                        return <Item key={crypto.randomUUID()} name={item.name} gender={item.gender} url={item.url} />;
                      })
                    )}
                  </div>
                  {details !== null ? (
                    <DetailsContainer>
                      <Details info={info} />
                    </DetailsContainer>
                  ) : (
                    ''
                  )}
                </section>
                <section>
                  {searchParam.count < NUM_PER_PAGE + 1 || searchParam.results === undefined ? (
                    ''
                  ) : (
                    <Pagination pageNum={pageNum} />
                  )}
                </section>
                <section className="flyoutContainer">{selectedArr.length > 0 ? <FlyoutElement /> : ''}</section>
              </div>
            </div>
          )}
        </Layout>
      </ErrorBoundary>
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const search = context.query.search;
  const page = context.query.page;
  const res = await fetch(`https://swapi.dev/api/people/?search=${search || ''}&page=${page || '1'}`);
  const searchParam = await res.json();
  const pageNum = Math.ceil(searchParam.count / 10);
  const details = context.query.details;
  const infoRes = await fetch(`https://swapi.dev/api/people/${details}`);
  const info = await infoRes.json();
  const themeCookie = context.req.cookies['theme'];
  const searchCookie = context.req.cookies['search'];
  return {
    props: {
      searchParam,
      title: 'SW Search',
      info,
      pageNum,
      themeSet: themeCookie || '',
      searchSet: searchCookie || '',
    },
  };
}) satisfies GetServerSideProps<{
  searchParam: IResponse;
  title: string;
  info: IPeople;
}>;
