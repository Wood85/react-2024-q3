import React from 'react';
import './BuggyButton.css';

class BuggyButton extends React.Component {
  state = {
    counter: 0,
  };

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  render() {
    if (this.state.counter > 0) {
      throw new Error('Simulated error.');
    }
    return (
      <div>
        <button className="button buggy-button" onClick={this.handleClick}>
          Call Error
        </button>
      </div>
    );
  }
}

export default BuggyButton;
