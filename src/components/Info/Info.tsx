import './Info.css';
import { useContext } from 'react';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { showInfo } from './../../store/reducers/infoSlice';
import { ThemeContext } from './../../context/ThemeContext';
import images from './../../data/images';

const Info = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? 'theme-dark' : 'theme-light';

  const info = useAppSelector((state) => state.info.data);
  const dispatch = useAppDispatch();
  function hideInfo() {
    dispatch(showInfo(false));
  }

  const findImage = (id: string) => {
    const image = images.find((image) => image.id === id);
    if (image) {
      return image.src;
    }
  };

  return (
    <div className={`info ${theme}`} data-testid="info" onClick={(e) => e.stopPropagation()}>
      <h2 className="name field">{info.name}</h2>
      <img src={findImage(info.name)} className="info__img" alt={info.name} />
      <div className="gender field">gender: {info.gender}</div>
      <div className="birth-year field">birth year: {info.birth_year}</div>
      <div className="height field">height: {info.height}</div>
      <div className="mass field">mass: {info.mass}</div>
      <div className="hair-color field">hair color: {info.hair_color}</div>
      <div className="skin-color field">skin color: {info.skin_color}</div>
      <div className="eye-color field">eye color: {info.eye_color}</div>
      <button className={`info__button-close ${theme}`} onClick={hideInfo}>
        Close
      </button>
    </div>
  );
};

export default Info;
