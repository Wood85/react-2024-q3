import React, { ChangeEvent, FormEvent } from 'react';
import './SearchForm.css';
import search from './../../services/SWAPI/SWAPI';
import { IPeople } from 'interfaces/interfaces';
import { emptyValue } from './../../utils/constants';

interface IState {
  value: string;
}

interface IFormProps {
  class: string;
  updateData: (value: IPeople[] | undefined, loading: boolean) => void;
}

class SearchForm extends React.Component {
  state: Readonly<IState>;
  props: Readonly<IFormProps>;
  constructor(props: Readonly<IFormProps>) {
    super(props);
    this.state = { value: localStorage.getItem('SW_search_req') || '' };
    this.props = props;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.updateData(emptyValue, false);
    search(this.state.value).then((res) => {
      if (res !== undefined) {
        this.props.updateData(res, false);
        localStorage.setItem('SW_search_req', this.state.value);
      } else {
        this.props.updateData(undefined, false);
        localStorage.setItem('SW_search_req', this.state.value);
      }
    });
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
