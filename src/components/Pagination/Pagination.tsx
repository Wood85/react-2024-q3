import './Pagination.css';
import PageNumber from './../../components/PageNumber/PageNumber';

interface IPaginationProps {
  count: number;
}

const Pagination = (props: IPaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= props.count; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <button className="pagination__prev button"> &lt;&lt; prev</button>
      <div className="pagination__page-numbers">
        {pageNumbers.map((item: number) => (
          <PageNumber key={crypto.randomUUID()} num={item} />
        ))}
      </div>
      <button className="pagination__next button">next &gt;&gt;</button>
    </div>
  );
};

export default Pagination;
