import { render, screen } from '@testing-library/react';
import Spinner from './../components/spinner/spinner';

describe('Spinner', () => {
  test('renders the Spinner component', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('oval-loading')).toBeInTheDocument();
  });
});
