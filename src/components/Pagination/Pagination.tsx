import './Pagination.css';
import PageNumber from './../../components/PageNumber/PageNumber';
import { MouseEvent } from 'react';

interface IPaginationProps {
  count: number;
  onClick: (page: number) => void;
  onClickPrev: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickNext: (event: MouseEvent<HTMLButtonElement>) => void;
  selectedPage: number;
}

const Pagination = (props: IPaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= props.count; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <button className="pagination__prev button" onClick={props.onClickPrev}>
        {''}
        &lt;&lt; prev
      </button>
      <div className="pagination__page-numbers">
        {pageNumbers.map((item: number) => (
          <PageNumber key={crypto.randomUUID()} num={item} onClick={props.onClick} selectedPage={props.selectedPage} />
        ))}
      </div>
      <button className="pagination__next button" onClick={props.onClickNext}>
        next &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
