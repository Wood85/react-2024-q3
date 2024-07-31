'use client';
import styles from './Info.module.css';
import { useContext } from 'react';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { showInfo } from './../../store/reducers/infoSlice';
import { ThemeContext } from './../../context/ThemeContext';
import images from './../../data/images';
import Image from 'next/image';

const Info = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

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

  const image = findImage(info.name);

  return (
    <div className={`${styles.info} ${theme}`} data-testid="info" onClick={(e) => e.stopPropagation()}>
      <h2 className={styles.name}>{info.name}</h2>
      {image !== undefined ? <Image src={image.src} className={styles.img} width={190} height={160} alt={info.name} /> : ''}
      <div className={`${styles.gender} ${styles.field}`}>gender: {info.gender}</div>
      <div className={`${styles.birthYear} ${styles.field}`}>birth year: {info.birth_year}</div>
      <div className={`${styles.height} ${styles.field}`}>height: {info.height}</div>
      <div className={`${styles.mass} ${styles.field}`}>mass: {info.mass}</div>
      <div className={`${styles.hairColor} ${styles.field}`}>hair color: {info.hair_color}</div>
      <div className={`${styles.skinColor} ${styles.field}`}>skin color: {info.skin_color}</div>
      <div className={`${styles.eyeColor} ${styles.field}`}>eye color: {info.eye_color}</div>
      <button className={`${styles.buttonClose} ${theme}`} onClick={hideInfo}>
        Close
      </button>
    </div>
  );
};

export default Info;
