import { render, screen } from '@testing-library/react';
import BuggyButton from './../components/BuggyButton/BuggyButton';

describe('BuggyButton', () => {
  test('renders the BuggyButton component', () => {
    render(<BuggyButton />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });
});
