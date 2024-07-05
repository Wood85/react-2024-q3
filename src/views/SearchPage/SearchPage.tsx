import React from 'react';
import './SearchPage.css';
import Input from './../../components/Input/Input';
import Button from './../../components/Button/Button';
class SearchPage extends React.Component {
  render() {
    return (
      <div className="search-page">
        <section className="search">
          <div className="search-block">
            <Input />
            <Button />
          </div>
        </section>

        <div className="results"></div>
      </div>
    );
  }
}

export default SearchPage;
