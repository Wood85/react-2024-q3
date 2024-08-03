import styles from './SearchForm.module.css';
import { useRouter } from 'next/navigation';
import { FormEvent, MouseEvent, useState, useContext, useEffect } from 'react';
import { ThemeContext } from './../../context/ThemeContext';
import { useSearchParams } from 'next/navigation';

const SearchForm = () => {
  const { isDarkTheme } = useContext(ThemeContext);
  const theme = isDarkTheme ? styles.darkTheme : styles.lightTheme;

  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();

  const search = useSearchParams();

  const query = search ? search.get('search') : null;

  const encodedSearchQuery = encodeURI(query || '');

  useEffect(() => {
    setSearchQuery(encodedSearchQuery);
  }, [search]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`?search=${encodedSearchQuery}&page=1`);
    localStorage.setItem('SW_search_req', searchQuery);
  }

  return (
    <form
      data-testid="search-form"
      className={`${styles.form} ${theme}`}
      onSubmit={handleSubmit}
      onClick={(e: MouseEvent<HTMLFormElement>) => e.stopPropagation()}
    >
      <input
        data-testid="input"
        type="text"
        name="search"
        className={`${styles.input} ${theme}`}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button type="submit" className={`${styles.button} ${theme} button`}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
