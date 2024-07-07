import React from 'react';
import './Title.css';
import starWarsLogo from './../../assets/star-wars.svg';

class Title extends React.Component {
  render() {
    return (
      <div className="title-container">
        <img src={starWarsLogo} className="logo" alt="SW logo" />
        <h1 className="title-text">find your character</h1>
      </div>
    );
  }
}

export default Title;
