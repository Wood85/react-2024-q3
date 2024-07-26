import { render, screen } from '@testing-library/react';
import Title from './../components/Title/Title';

describe('Title', () => {
  test('renders the Title component', () => {
    render(<Title theme="dark" />);
    const title = screen.getByText('find your character');
    expect(title).toBeInTheDocument();
  });
});
