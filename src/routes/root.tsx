import styles from './root.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import DataItem from '../components/data-item/DataItem';

function Root() {
  const getForms = useAppSelector((state) => state.form.forms);
  return (
    <div className={styles.forms}>
      <h1>Forms</h1>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to={'uncontroll'} className={styles.link}>
              uncontroll
            </Link>
          </li>
          <li className={styles.item}>
            <Link to={'hook-form'} className={styles.link}>
              hook form
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.results}>
        {getForms.map((item, index) => {
          const current = getForms.length === index + 1;
          return (
            <DataItem
              key={crypto.randomUUID()}
              name={item.name}
              age={item.age}
              email={item.email}
              gender={item.gender}
              password={item.password}
              checkbox={item.checkbox}
              file={item.file}
              country={item.country}
              current={current}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Root;
