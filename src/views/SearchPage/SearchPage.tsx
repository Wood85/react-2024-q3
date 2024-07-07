import React from 'react';
import './SearchPage.css';
import SearchForm from './../../components/SearchForm/SearchForm';
import { IPeople } from 'interfaces/interfaces';
import Item from './../../components/Item/Item';
import search from './../../services/SWAPI/SWAPI';
import { emptyValue } from './../../utils/constants';
import Spinner from './../../components/spinner/spinner';
import NotFound from './../../components/NotFound/NotFound';
import Title from './../../components/Title/Title';

class SearchPage extends React.Component {
  state = {
    loading: false,
    value: emptyValue,
  };

  updateData = (value: IPeople[] | undefined) => {
    this.setState({ value: value });
  };

  componentDidMount(): void {
    if (localStorage.getItem('SW_search_req') !== null) {
      const searchReq = localStorage.getItem('SW_search_req');
      if (searchReq !== null) {
        this.setState({ loading: true });
        search(searchReq).then((res) => {
          if (res !== undefined) {
            this.setState({ loading: false });
            this.setState({ value: res });
          } else {
            this.setState({ loading: false });
            this.setState({ value: undefined });
          }
        });
      }
    }
  }

  render() {
    return (
      <div className="search-page">
        <section className="search">
          <Title />
          <SearchForm class="search-form" updateData={this.updateData} />
        </section>
        <section className="results">
          {this.state.loading || (this.state.value !== undefined && this.state.value[0].name === '') ? (
            <Spinner />
          ) : this.state.value === undefined ? (
            <NotFound />
          ) : (
            this.state.value.map((item) => (
              <Item
                key={crypto.randomUUID()}
                name={item.name}
                gender={item.gender}
                birthYear={item.birth_year}
                height={item.height}
                mass={item.mass}
                hairColor={item.hair_color}
                skinColor={item.skin_color}
                eyeColor={item.eye_color}
              />
            ))
          )}
        </section>
      </div>
    );
  }
}

export default SearchPage;
