import { useEffect } from 'react';
import './App.css';
import SearchPage from './views/SearchPage/SearchPage';

interface IProps {
  class: string;
}

const App = (props: Readonly<IProps>) => {
  useEffect(() => {
    if (!localStorage.getItem('SW_search_req')) {
      localStorage.setItem('SW_search_req', '');
    }
  }, []);

  return (
    <div className={props.class}>
      <SearchPage />
    </div>
  );
};

export default App;
