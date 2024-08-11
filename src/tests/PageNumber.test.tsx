import { render, screen } from '@testing-library/react';
import PageNumber from './../components/PageNumber/PageNumber';
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

describe('PageNumber', () => {
  test('renders the PageNumber component', () => {
    render(
      <Provider store={store}>
        <PageNumber num={1} />
      </Provider>,
    );
    const pageNum = screen.getByTestId('page-num');
    expect(pageNum).toBeInTheDocument();
  });
});
