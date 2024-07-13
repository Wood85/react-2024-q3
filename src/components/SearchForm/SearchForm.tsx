import { ChangeEvent, FormEvent, useState } from 'react';
import './SearchForm.css';
import { search } from './../../services/SWAPI/SWAPI';
import { IResponse } from 'interfaces/interfaces';
import { emptyData } from './../../utils/constants';
import BuggyButton from './../../components/BuggyButton/BuggyButton';

interface IFormProps {
  class: string;
  updateData: (value: IResponse, loading: boolean) => void;
}

const SearchForm = (props: Readonly<IFormProps>) => {
  const searchReq = { value: localStorage.getItem('SW_search_req') || '' };

  const [state, setState] = useState(searchReq);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ value: event.target.value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.updateData(emptyData, false);
    search(state.value).then((res) => {
      props.updateData(res, false);
      localStorage.setItem('SW_search_req', state.value);
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
