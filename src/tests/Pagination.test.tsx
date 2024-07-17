import { render, screen } from '@testing-library/react';
import Pagination from './../components/Pagination/Pagination';
import { IPaginationProps } from './../components/Pagination/Pagination';

const onClick = vi.fn();
const onClickPrev = vi.fn();
const onClickNext = vi.fn();

const pagination: IPaginationProps = {
  count: 6,
  onClick,
  onClickPrev,
  onClickNext,
  selectedPage: 4,
};

describe('Pagination', () => {
  test('renders the Pagination component with page buttons', () => {
    const arrNumPage = [];
    for (let i = 1; i <= pagination.count; i++) {
      arrNumPage.push(i);
    }

    render(
      <Pagination
        count={pagination.count}
        selectedPage={pagination.selectedPage}
        onClick={pagination.onClick}
        onClickPrev={pagination.onClickPrev}
        onClickNext={pagination.onClickNext}
      />,
    );

    arrNumPage.forEach((num) => {
      expect(screen.getByText(`${num}`)).toBeInTheDocument();
    });
  });

  test('does not contain a button number greater than count', () => {
    render(
      <Pagination
        count={pagination.count}
        selectedPage={pagination.selectedPage}
        onClick={pagination.onClick}
        onClickPrev={pagination.onClickPrev}
        onClickNext={pagination.onClickNext}
      />,
    );

    expect(screen.queryByText(`${pagination.count + 1}`)).not.toBeInTheDocument();
  });
});
