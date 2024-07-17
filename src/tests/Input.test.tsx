import { render, screen } from '@testing-library/react';
import Input from './../components/Input/Input';

const handleInputChange = vi.fn();

describe('Input', () => {
  test('renders the Input component', () => {
    render(<Input class="input" value="" handleInputChange={handleInputChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});
