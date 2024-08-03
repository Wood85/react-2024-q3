import { render, screen } from '@testing-library/react';
import Pagination from './../components/Pagination/Pagination';
import { Provider } from 'react-redux';
import store from './mockStore';
import { describe, expect, test, vi } from 'vitest';

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

describe('Pagination', () => {
  test('renders the Pagination component', () => {
    render(
      <Provider store={store}>
        <Pagination />
      </Provider>,
    );
    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();
  });
});
