import { render, screen } from '@testing-library/react';
import PageNumber from './../components/PageNumber/PageNumber';

const onClick = vi.fn();

const page = {
  num: 6,
  onClick,
  selectedPage: 5,
};

describe('PageNumber', () => {
  test('renders the PageNumber component', () => {
    render(<PageNumber num={page.num} selectedPage={page.selectedPage} onClick={page.onClick} />);
    expect(screen.getByText(`${page.num}`)).toBeInTheDocument();
  });
});
