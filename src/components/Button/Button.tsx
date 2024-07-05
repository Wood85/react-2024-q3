import React, { MouseEvent } from 'react';
import './Button.css';
import SWAPI from './../../services/SWAPI/SWAPI';
class Button extends React.Component {
  handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    SWAPI.search('sky').then((responses) =>
      responses.forEach(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const json = await response.json();
          if (json.count > 0) {
            console.log(json);
          }
        }
      }),
    );
  }
  render() {
    return (
      <button type="submit" className="search-button" onClick={this.handleClick}>
        Search
      </button>
    );
  }
}

export default Button;
