import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
import ErrorPage from './../views/ErrorPage/ErrorPage';
// import store from './mockStore';

describe('ErrorPage', () => {
  test('renders the ErrorPage component', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });

  // it('After clicking the "Back" link, the "Search" page opens.', () => {
  //   render(
  //     <MemoryRouter>
  //       <Provider store={store}>
  //         <ErrorPage />
  //       </Provider>
  //     </MemoryRouter>,
  //   );

  //   userEvent.click(screen.getByTestId('back'));
  //   expect(screen.getByTestId('search-page')).toBeInTheDocument();
  // });

  // test('should be back', async () => {
  //   render(
  //     <MemoryRouter>
  //       <ErrorPage />
  //     </MemoryRouter>,
  //   );
  //   userEvent.click(screen.getByTestId('back'));
  //   expect(screen.getByText(/find your character/i)).toBeInTheDocument();
  // });
});
