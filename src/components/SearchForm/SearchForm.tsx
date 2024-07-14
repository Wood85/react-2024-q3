import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SearchForm.css';
import { search } from './../../services/SWAPI/SWAPI';
import { IResponse } from 'interfaces/interfaces';
import { emptyData } from './../../utils/constants';
import BuggyButton from './../../components/BuggyButton/BuggyButton';

interface IFormProps {
  class: string;
  updateData: (value: IResponse, loading: boolean, page: number) => void;
}

const SearchForm = (props: Readonly<IFormProps>) => {
  const searchReq = { value: localStorage.getItem('SW_search_req') || '' };

  const [state, setState] = useState(searchReq);
  const [searchParams, setSearchParams] = useSearchParams();

  searchParams.get('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ value: event.target.value });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.updateData(emptyData, false, 1);
    search(state.value, 1).then((res) => {
      props.updateData(res, false, 1);
      localStorage.setItem('SW_search_req', state.value);
      setSearchParams({ search: state.value, page: '1' });
    });
  }

  return (
    <form
      className={props.class}
      onSubmit={handleSubmit}
      onClick={(e: MouseEvent<HTMLFormElement>) => e.stopPropagation()}
    >
      <input type="text" className="search-input" value={state.value} onChange={handleChange} />
      <button type="submit" className="search-button button">
        Search
      </button>
      <BuggyButton />
    </form>
  );
};

export default SearchForm;
