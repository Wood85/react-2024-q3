import { render, screen } from '@testing-library/react';
import DetailsContainer from './../components/DetailsContainer/DetailsContainer';
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

describe('DetailsContainer', () => {
  test('renders the DetailsContainer component', () => {
    render(
      <Provider store={store}>
        <DetailsContainer />
      </Provider>,
    );
    const infoContainer = screen.getByTestId('info-container');
    expect(infoContainer).toBeInTheDocument();
  });
});
