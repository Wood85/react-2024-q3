import './PageNumber.css';

interface IPageNumberProps {
  num: number;
}
const PageNumber = (props: IPageNumberProps) => {
  return <div className="pagination__page-number">{props.num}</div>;
};

export default PageNumber;
