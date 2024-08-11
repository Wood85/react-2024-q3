import { render, screen } from '@testing-library/react';
import Details from './../components/Details/Details';
import { Provider } from 'react-redux';
import store from './mockStore';
import { describe, expect, test, vi } from 'vitest';
import { character } from './mockStore';

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

describe('Details', () => {
  test('renders the Details component', () => {
    render(
      <Provider store={store}>
        <Details info={character} />
      </Provider>,
    );
    const info = screen.getByTestId('info');
    expect(info).toBeInTheDocument();
  });
});
