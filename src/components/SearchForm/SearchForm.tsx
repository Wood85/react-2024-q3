import { ChangeEvent, FormEvent, useState } from 'react';
import './SearchForm.css';
import search from './../../services/SWAPI/SWAPI';
import { IPeople } from 'interfaces/interfaces';
import { emptyValue } from './../../utils/constants';
import BuggyButton from './../../components/BuggyButton/BuggyButton';

interface IFormProps {
  class: string;
  updateData: (value: IPeople[] | undefined, loading: boolean) => void;
}

const SearchForm = (props: Readonly<IFormProps>) => {
  const searchReq = { value: localStorage.getItem('SW_search_req') || '' };

  const [state, setState] = useState(searchReq);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ value: event.target.value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.updateData(emptyValue, false);
    search(state.value).then((res) => {
      if (res !== undefined) {
        props.updateData(res.results, false);
        localStorage.setItem('SW_search_req', state.value);
      } else {
        props.updateData(undefined, false);
        localStorage.setItem('SW_search_req', state.value);
      }
    });
  }

  return (
    <form className={props.class} onSubmit={handleSubmit}>
      <input type="text" className="search-input" value={state.value} onChange={handleChange} />
      <button type="submit" className="search-button button">
        Search
      </button>
      <BuggyButton />
    </form>
  );
};

export default SearchForm;
