import { render, screen } from '@testing-library/react';
import InfoContainer from './../components/InfoContainer/InfoContainer';
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

describe('InfoContainer', () => {
  test('renders the InfoContainer component', () => {
    render(
      <Provider store={store}>
        <InfoContainer />
      </Provider>,
    );
    const infoContainer = screen.getByTestId('info-container');
    expect(infoContainer).toBeInTheDocument();
  });
});
