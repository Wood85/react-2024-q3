import { render, screen, act, within } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Item from './../components/Item/Item';
import { Provider } from 'react-redux';
import storeMock, { character } from './mockStore';
import { arrOfSelected } from './../store/reducers/selectedCharactersSlice';
import { store } from './../store/store';

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

describe('Item', () => {
  test('renders the Item component', () => {
    render(
      <Provider store={storeMock}>
        <Item key={crypto.randomUUID()} name={character.name} gender={character.gender} url={character.url} />
      </Provider>,
    );
    const item = screen.getByTestId('item');
    expect(item).toBeInTheDocument();
  });
  test('change the state when dispatching "arrOfSelected" ', () => {
    render(
      <Provider store={store}>
        <Item key={crypto.randomUUID()} name={character.name} gender={character.gender} url={character.url} />
      </Provider>,
    );
    act(() => {
      store.dispatch(arrOfSelected([]));
    });

    expect(store.getState().selected.selected.length).toBe(0);
    act(() => {
      store.dispatch(arrOfSelected([character, character]));
    });
    expect(store.getState().selected.selected.length).toBe(2);
  });

  test('check display the name in the item', () => {
    render(
      <Provider store={storeMock}>
        <Item key={crypto.randomUUID()} name={character.name} gender={character.gender} url={character.url} />
      </Provider>,
    );
    const { getByText } = within(screen.getByTestId('item'));
    expect(getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
