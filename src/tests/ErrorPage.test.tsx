import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ErrorPage from './../views/ErrorPage/ErrorPage';

describe('ErrorPage', () => {
  test('renders the ErrorPage component', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('error-page')).toBeInTheDocument();
  });
});
