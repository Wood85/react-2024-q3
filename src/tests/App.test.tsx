import { render, screen } from '@testing-library/react';
import App from './../App';
import { Provider } from 'react-redux';
import store from './mockStore';

describe('App', () => {
  test('renders the FlyoutElement component', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    const app = screen.getByTestId('app');
    expect(app).toBeInTheDocument();
  });
});
