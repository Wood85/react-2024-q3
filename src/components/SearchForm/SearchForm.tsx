import React, { ChangeEvent, FormEvent } from 'react';
import './SearchForm.css';
import SWAPI from './../../services/SWAPI/SWAPI';

interface IState {
  value: string;
}

interface IFormProps {
  class: string;
}
class SearchForm extends React.Component {
  state: Readonly<IState>;
  props: Readonly<IFormProps>;
  constructor(props: Readonly<IFormProps>) {
    super(props);
    this.state = { value: '' };
    this.props = props;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    SWAPI.search(this.state.value).then((responses) =>
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
      <form className={this.props.class} onSubmit={this.handleSubmit}>
        <input type="text" className="search-input" value={this.state.value} onChange={this.handleChange} />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    );
  }
}

export default SearchForm;
