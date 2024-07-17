import './Input.css';
import { ChangeEvent } from 'react';

interface IInputProps {
  class: string;
  value: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: IInputProps) => {
  return (
    <input
      data-testid="input"
      type="text"
      className={props.class}
      value={props.value}
      onChange={props.handleInputChange}
    />
  );
};

export default Input;
