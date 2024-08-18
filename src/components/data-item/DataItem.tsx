import styles from './DataItem.module.css';
import { countryType } from './../../store/reducers/countriesSlice';

interface Props {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female';
  checkbox: boolean;
  file: string;
  country: countryType;
  current: boolean;
}

const DataItem = (props: Props) => {
  return (
    <div className={props.current === true ? `${styles.container} ${styles.current}` : `${styles.container}`}>
      <div>Name: {props.name}</div>
      <div>Age: {props.age}</div>
      <div>Email: {props.email}</div>
      <div>Password: {props.password}</div>
      <div>Gender: {props.gender}</div>
      <div>T&C: {props.checkbox ? '✔' : '✖'}</div>
      <img className={styles.file} src={props.file} />
      <div>Country: {props.country}</div>
    </div>
  );
};

export default DataItem;
