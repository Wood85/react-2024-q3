import { useEffect } from 'react';
import './App.css';
import SearchPage from './views/SearchPage/SearchPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './views/ErrorPage/ErrorPage';

const App = () => {
  useEffect(() => {
    if (!localStorage.getItem('SW_search_req')) {
      localStorage.setItem('SW_search_req', '');
    }
  }, []);

  return (
    <div className="app" data-testid="app">
      <div></div>
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
