'use client';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFound} data-testid="not-found">
      Character Not Found
    </div>
  );
};

export default NotFound;
