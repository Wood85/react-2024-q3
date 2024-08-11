import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './../pages/index';
import storeMock, { character } from './mockStore';
import { Provider } from 'react-redux';

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

const search = {
  count: 1,
  next: null,
  previous: null,
  results: [character],
};

describe('Page', () => {
  test('renders the Page component', () => {
    render(
      <Provider store={storeMock}>
        <Page searchParam={search} title="SW Search" info={character} pageNum={1} themeSet="dark" searchSet="j" />
      </Provider>,
    );
    const page = screen.getByTestId('search-page');
    expect(page).toBeInTheDocument();
  });
});
