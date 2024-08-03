import styles from './SelectFlag.module.css';
import { useAppSelector } from './../../hooks/redux';
import { useContext } from 'react';
import { ThemeContext } from './../../context/ThemeContext';

interface ISelectFlagProps {
  name: string;
}

const SelectFlag = (props: ISelectFlagProps) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const selectArr = useAppSelector((state) => state.selected.selected);
  const selectArrName = selectArr.map((item) => item.name);
  const check = selectArrName.includes(props.name);

  return check === false ? (
    <div className={`${styles.flag} ${styles.flagHide}`}></div>
  ) : (
    <div className={`${styles.flag} ${theme}`}>selected</div>
  );
};

export default SelectFlag;
