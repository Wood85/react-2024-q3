import React from 'react';
import './App.css';
import SearchPage from './views/SearchPage/SearchPage';

interface IState {
  value: string;
}

interface IProps {
  class: string;
}

class App extends React.Component {
  state: Readonly<IState>;
  props: Readonly<IProps>;
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = { value: localStorage.getItem('SW_search_req') || '' };
    this.props = props;
    this.checkLS();
  }

  checkLS() {
    if (!localStorage.getItem('SW_search_req')) {
      localStorage.setItem('SW_search_req', '');
    }
  }

  render() {
    return (
      <div className="app">
        <SearchPage />
      </div>
    );
  }
}

export default App;
