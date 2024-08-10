import styles from './DetailsContainer.module.css';
import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const DetailsContainer: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container} data-testid="info-container">
      {children}
    </div>
  );
};

export default DetailsContainer;
