import './PageNumber.css';

interface IPageNumberProps {
  num: number;
  onClick: (page: number) => void;
  selectedPage: number;
}
const PageNumber = (props: IPageNumberProps) => {
  return (
    <>
      {props.selectedPage === props.num ? (
        <div
          className="pagination__page-number pagination__page-number_active"
          onClick={() => {
            props.onClick(props.num);
          }}
        >
          {props.num}
        </div>
      ) : (
        <div
          className="pagination__page-number"
          onClick={() => {
            props.onClick(props.num);
          }}
        >
          {props.num}
        </div>
      )}
    </>
  );
};

export default PageNumber;
