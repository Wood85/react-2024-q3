import { render, screen } from '@testing-library/react';
import FlyoutElement from './../components/FlyoutElement/FlyoutElement';
import { Provider } from 'react-redux';
import store from './mockStore';

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
