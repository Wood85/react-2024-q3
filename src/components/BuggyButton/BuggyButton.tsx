import { useState } from 'react';
import './BuggyButton.css';

const BuggyButton = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  if (count > 0) {
    throw new Error('Simulated error.');
  }

  return (
    <div>
      <button className="button buggy-button" onClick={handleClick}>
        Call Error
      </button>
    </div>
  );
};

export default BuggyButton;
