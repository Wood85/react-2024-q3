import SearchForm from './../components/SearchForm/SearchForm';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from './mockStore';

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: () => null,
    };
  },
  useSearchParams() {
    return {
      get: () => null,
    };
  },
}));

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
