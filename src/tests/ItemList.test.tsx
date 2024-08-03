import { render, screen } from '@testing-library/react';
import ItemList from './../components/ItemList/ItemList';
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

describe('ItemList', () => {
  test('renders the ItemList component', () => {
    render(
      <Provider store={store}>
        <ItemList />
      </Provider>,
    );
    const itemList = screen.getByTestId('item-list');
    expect(itemList).toBeInTheDocument();
  });
});
