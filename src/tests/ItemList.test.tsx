import { render, screen } from '@testing-library/react';
import ItemList from './../components/ItemList/ItemList';
import { Provider } from 'react-redux';
import store from './mockStore';

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
