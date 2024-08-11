import { render, screen } from '@testing-library/react';
import SwitchTheme from './../components/SwitchTheme/SwitchTheme';
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

describe('SwitchTheme', () => {
  test('renders the SwitchTheme component', () => {
    render(
      <Provider store={store}>
        <SwitchTheme />
      </Provider>,
    );
    expect(screen.getByTestId('switch')).toBeInTheDocument();
  });
});
