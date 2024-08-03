import { Oval } from 'react-loader-spinner';
import styles from './spinner.module.css';

const Spinner = () => {
  return (
    <Oval
      height="80"
      width="80"
      color="#646cffaa"
      secondaryColor="#646cff"
      wrapperStyle={{
        justifyContent: 'center',
      }}
      wrapperClass={styles.wrapper}
    />
  );
};

export default Spinner;
