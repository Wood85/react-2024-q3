import { FC, useEffect, useContext } from 'react';
import './App.css';
import SearchPage from './views/SearchPage/SearchPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './views/ErrorPage/ErrorPage';
import { ThemeContext } from './context/ThemeContext';
import { useGetCharactersMutation } from './services/SWAPI/SWAPI';
import { useAppDispatch } from './hooks/redux';
import { setCurrentCharacters } from './store/reducers/charactersSlice';

const App: FC = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  const dispatch = useAppDispatch();
  const [getCharacters] = useGetCharactersMutation();
  useEffect(() => {
    if (!localStorage.getItem('SW_search_req')) {
      localStorage.setItem('SW_search_req', '');
      (async () => {
        const res = await getCharacters({ req: '' }).unwrap();
        dispatch(setCurrentCharacters(res));
      })();
    }
  }, []);

  return (
    <div className={isDarkTheme ? 'app theme-dark' : 'app theme-light'} data-testid="app">
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />}></Route>
          <Route path="/search/:page" element={<SearchPage />}></Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
