import styles from './root.module.css';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

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
      <div className={styles.results}>{getForms.length}</div>
    </div>
  );
}

export default Root;
