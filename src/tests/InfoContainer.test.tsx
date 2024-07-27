import { render, screen } from '@testing-library/react';
import InfoContainer from './../components/InfoContainer/InfoContainer';
import { Provider } from 'react-redux';
import store from './mockStore';

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
