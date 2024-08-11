import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Results from './../components/Results/Results';
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

describe('Results', () => {
  test('renders the Results component', () => {
    render(
      <Provider store={storeMock}>
        <Results data={search} details={character} search={undefined} theme={undefined} />
      </Provider>,
    );
    const page = screen.getByTestId('search-page');
    expect(page).toBeInTheDocument();
  });
});
