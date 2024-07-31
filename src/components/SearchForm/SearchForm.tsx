'use client';
import { ChangeEvent, FormEvent, MouseEvent, useState, useContext, useEffect } from 'react';
import styles from './SearchForm.module.css';
import Input from './../Input/Input';
import { useAppDispatch } from './../../hooks/redux';
import { pageNum, setCurrentCharacters, loading } from './../../store/reducers/charactersSlice';
import { useGetCharactersMutation } from './../../services/SWAPI/SWAPI';
import { ThemeContext } from './../../context/ThemeContext';

const SearchForm = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const [state, setState] = useState({ value: '' });

  useEffect(() => {
    const searchReq = { value: localStorage.getItem('SW_search_req') || '' };
    setState(searchReq);
  }, []);

  const dispatch = useAppDispatch();

  const [getCharacters] = useGetCharactersMutation();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ value: event.target.value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchReqData = formData.get('search');
    if (typeof searchReqData === 'string') {
      dispatch(loading(true));
      const res = await getCharacters({ req: searchReqData }).unwrap();
      dispatch(setCurrentCharacters(res));
      dispatch(loading(false));
      localStorage.setItem('SW_search_req', searchReqData);
    } else {
      dispatch(loading(true));
      const res = await getCharacters({ req: '' }).unwrap();
      dispatch(setCurrentCharacters(res));
      dispatch(loading(false));
      localStorage.setItem('SW_search_req', '');
    }
    dispatch(pageNum(1));
  }

  return (
    <form
      data-testid="search-form"
      className={`${styles.form} ${theme}`}
      onSubmit={handleSubmit}
      onClick={(e: MouseEvent<HTMLFormElement>) => e.stopPropagation()}
    >
      <Input name="search" value={state.value} handleInputChange={handleChange} />
      <button type="submit" className={`${styles.button} ${theme} button`}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
