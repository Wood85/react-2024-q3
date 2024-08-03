import { render, screen } from '@testing-library/react';
import FlyoutElement from './../components/FlyoutElement/FlyoutElement';
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

describe('FlyoutElement', () => {
  test('renders the FlyoutElement component', () => {
    render(
      <Provider store={store}>
        <FlyoutElement />
      </Provider>,
    );
    const flyout = screen.getByTestId('flyout');
    expect(flyout).toBeInTheDocument();
  });
});
