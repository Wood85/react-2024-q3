import { Oval } from 'react-loader-spinner';
import styles from './spinner.module.css';
import { ThemeContext } from './../../context/ThemeContext';
import { useContext } from 'react';

const Spinner = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;
  return (
    <div className={`${styles.wrap} ${theme}`}>
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
    </div>
  );
};

export default Spinner;
