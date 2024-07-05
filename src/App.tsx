import React from 'react';
import './App.css';
import SearchPage from './views/SearchPage/SearchPage';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <SearchPage></SearchPage>
      </div>
    );
  }
}

export default App;
