import { Oval } from 'react-loader-spinner';

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
      wrapperClass="spinner-wrapper"
    />
  );
};

export default Spinner;
