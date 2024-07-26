import { render, screen } from '@testing-library/react';
import NotFound from './../components/NotFound/NotFound';

describe('NotFound', () => {
  test('renders the NotFound component', () => {
    render(<NotFound />);
    const notFound = screen.getByTestId('not-found');
    expect(notFound).toBeInTheDocument();
    expect(screen.getByText('Character Not Found')).toBeInTheDocument();
  });
});
