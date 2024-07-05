import React from 'react';
import './SearchPage.css';
import SearchForm from './../../components/SearchForm/SearchForm';
class SearchPage extends React.Component {
  render() {
    return (
      <div className="search-page">
        <section className="search">
          <SearchForm class="search-form" />
        </section>

        <section className="results"></section>
      </div>
    );
  }
}

export default SearchPage;
