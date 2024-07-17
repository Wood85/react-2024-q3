import './Item.css';

export interface IItemProps {
  name: string;
  gender: string;
  url: string;
  onClick: (url: string) => void;
}

const Item = (props: Readonly<IItemProps>) => {
  return (
    <div
      className="item"
      onClick={(e) => {
        e.stopPropagation();
        props.onClick(props.url);
      }}
    >
      <h2 className="name field">{props.name}</h2>
      <div className="gender field">gender: {props.gender}</div>
    </div>
  );
};

export default Item;
