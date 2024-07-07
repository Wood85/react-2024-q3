import React from 'react';
import { Oval } from 'react-loader-spinner';

class Spinner extends React.Component {
  render() {
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
  }
}

export default Spinner;
