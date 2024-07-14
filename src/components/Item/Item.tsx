import './Item.css';

interface IItemProps {
  name: string;
  gender: string;
  birthYear: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  onClick: () => void;
}

const Item = (props: Readonly<IItemProps>) => {
  return (
    <div
      className="item"
      onClick={(e) => {
        e.stopPropagation();
        props.onClick();
      }}
    >
      <h2 className="name field">{props.name}</h2>
      <div className="gender field">gender: {props.gender}</div>
    </div>
  );
};

export default Item;
