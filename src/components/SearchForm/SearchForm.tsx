import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import './SearchForm.css';
import BuggyButton from './../../components/BuggyButton/BuggyButton';
import Input from './../Input/Input';
import { useAppDispatch } from './../../hooks/redux';
import { pageNum, setCurrentCharacters } from './../../store/reducers/charactersSlice';
import { useGetCharactersMutation } from './../../services/SWAPI/SWAPI';

export interface IFormProps {
  class: string;
  theme: string;
}

const SearchForm = (props: Readonly<IFormProps>) => {
  const searchReq = { value: localStorage.getItem('SW_search_req') || '' };

  const dispatch = useAppDispatch();

  const [state, setState] = useState(searchReq);

  const [getCharacters] = useGetCharactersMutation();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ value: event.target.value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchReqData = formData.get('search');
    if (typeof searchReqData === 'string') {
      const res = await getCharacters({ req: searchReqData }).unwrap();
      dispatch(setCurrentCharacters(res));
      localStorage.setItem('SW_search_req', searchReqData);
    } else {
      const res = await getCharacters({ req: '' }).unwrap();
      dispatch(setCurrentCharacters(res));
      localStorage.setItem('SW_search_req', '');
    }
    dispatch(pageNum(1));
  }

  return (
    <form
      data-testid="search-form"
      className={`${props.class} ${props.theme}`}
      onSubmit={handleSubmit}
      onClick={(e: MouseEvent<HTMLFormElement>) => e.stopPropagation()}
    >
      <Input class={`search-input ${props.theme}`} name="search" value={state.value} handleInputChange={handleChange} />
      <button type="submit" className={`search-button ${props.theme} button`}>
        Search
      </button>
      <BuggyButton />
    </form>
  );
};

export default SearchForm;
