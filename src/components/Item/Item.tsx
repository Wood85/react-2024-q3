import React from 'react';
import './Item.css';

interface IItem {
  name: string;
  gender: string;
  birthYear: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
}

class Item extends React.Component {
  props: Readonly<IItem>;
  constructor(props: Readonly<IItem>) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="item">
        <h2 className="name field">{this.props.name}</h2>
        <div className="gender field">gender: {this.props.gender}</div>
        <div className="birth-year field">birth year: {this.props.birthYear}</div>
        <div className="height field">height: {this.props.height}</div>
        <div className="mass field">mass: {this.props.mass}</div>
        <div className="hair-color field">hair color: {this.props.hairColor}</div>
        <div className="skin-color field">skin color: {this.props.skinColor}</div>
        <div className="eye-color field">eye color: {this.props.eyeColor}</div>
      </div>
    );
  }
}

export default Item;
