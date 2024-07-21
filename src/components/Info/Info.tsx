import './Info.css';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { showInfo } from './../../store/reducers/infoSlice';

const Info = () => {
  const info = useAppSelector((state) => state.info.data);
  const dispatch = useAppDispatch();
  function hideInfo() {
    dispatch(showInfo(false));
  }
  return (
    <div className="info">
      <h2 className="name field">{info.name}</h2>
      <div className="gender field">gender: {info.gender}</div>
      <div className="birth-year field">birth year: {info.birth_year}</div>
      <div className="height field">height: {info.height}</div>
      <div className="mass field">mass: {info.mass}</div>
      <div className="hair-color field">hair color: {info.hair_color}</div>
      <div className="skin-color field">skin color: {info.skin_color}</div>
      <div className="eye-color field">eye color: {info.eye_color}</div>
      <button className="info__button-close" onClick={hideInfo}>
        Close
      </button>
    </div>
  );
};

export default Info;
