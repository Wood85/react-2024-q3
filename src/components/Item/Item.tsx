import './Item.css';

interface IItem {
  name: string;
  gender: string;
  birthYear: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
}

const Item = (props: Readonly<IItem>) => {
  return (
    <div className="item">
      <h2 className="name field">{props.name}</h2>
      <div className="gender field">gender: {props.gender}</div>
      <div className="birth-year field">birth year: {props.birthYear}</div>
      <div className="height field">height: {props.height}</div>
      <div className="mass field">mass: {props.mass}</div>
      <div className="hair-color field">hair color: {props.hairColor}</div>
      <div className="skin-color field">skin color: {props.skinColor}</div>
      <div className="eye-color field">eye color: {props.eyeColor}</div>
    </div>
  );
};

export default Item;
