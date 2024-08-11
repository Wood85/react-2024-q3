import { render, screen, fireEvent } from '@testing-library/react';
import BuggyButton from './../components/BuggyButton/BuggyButton';

describe('BuggyButton', () => {
  test('renders the BuggyButton component with initial text', () => {
    render(<BuggyButton />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(screen.getByText('Call Error')).toBeInTheDocument();
  });

  it('should throw an error when clicked', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    const renderWithError = () => {
      render(<BuggyButton />);
      fireEvent.click(screen.getByText('Call Error'));
    };

    expect(() => {
      renderWithError();
    }).toThrow('Simulated error.');

    consoleError.mockRestore();
  });
});
