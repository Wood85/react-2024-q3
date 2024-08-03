import { render, screen } from '@testing-library/react';
import Info from './../components/Info/Info';
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

describe('Info', () => {
  test('renders the Info component', () => {
    render(
      <Provider store={store}>
        <Info />
      </Provider>,
    );
    const info = screen.getByTestId('info');
    expect(info).toBeInTheDocument();
  });
});
