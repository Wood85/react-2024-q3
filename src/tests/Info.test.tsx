import { render, screen } from '@testing-library/react';
import Info from './../components/Info/Info';
import { Provider } from 'react-redux';
import store from './mockStore';

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
