import './PageNumber.css';

interface IPageNumberProps {
  num: number;
  onClick: (page: number) => void;
}
const PageNumber = (props: IPageNumberProps) => {
  return (
    <div
      className="pagination__page-number"
      onClick={() => {
        props.onClick(props.num);
      }}
    >
      {props.num}
    </div>
  );
};

export default PageNumber;
