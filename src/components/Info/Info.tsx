import './Info.css';
import { IPeople } from './../../interfaces/interfaces';

interface IInfoContainerProps {
  info: IPeople;
  handleCloseClick: () => void;
}

const Info = (props: IInfoContainerProps) => {
  return (
    <div className="info">
      <h2 className="name field">{props.info.name}</h2>
      <div className="gender field">gender: {props.info.gender}</div>
      <div className="birth-year field">birth year: {props.info.birth_year}</div>
      <div className="height field">height: {props.info.height}</div>
      <div className="mass field">mass: {props.info.mass}</div>
      <div className="hair-color field">hair color: {props.info.hair_color}</div>
      <div className="skin-color field">skin color: {props.info.skin_color}</div>
      <div className="eye-color field">eye color: {props.info.eye_color}</div>
      <button className="info__button-close" onClick={props.handleCloseClick}>
        Close
      </button>
    </div>
  );
};

export default Info;
