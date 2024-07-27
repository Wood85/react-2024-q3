import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, describe } from 'vitest';
import SearchPage from './../views/SearchPage/SearchPage';
import ErrorPage from './../views/ErrorPage/ErrorPage';
import { Provider } from 'react-redux';
import store from './mockStore';

describe('SearchPage', () => {
  test('should render ErrorPage for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Routes>
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="/search/:page" element={<SearchPage />}></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('This is not the page you are looking for')).toBeInTheDocument();
  });

  test('renders the SearchPage component', () => {
    render(
      <Provider store={store}>
        <SearchPage />
      </Provider>,
    );
    const searchPage = screen.getByTestId('search-page');
    expect(searchPage).toBeInTheDocument();
    expect(screen.getByText('find your character')).toBeInTheDocument();
  });
});
