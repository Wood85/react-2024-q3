import SearchForm from './../components/SearchForm/SearchForm';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './mockStore';

describe('SearchForm', () => {
  test('renders the SearchForm component', () => {
    render(
      <Provider store={store}>
        <SearchForm theme="dark" class="search-form" />
      </Provider>,
    );
    const searchForm = screen.getByTestId('search-form');
    expect(searchForm).toBeInTheDocument();
  });
});
