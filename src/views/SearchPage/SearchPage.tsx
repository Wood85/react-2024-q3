import React from 'react';
import './SearchPage.css';
import SearchForm from './../../components/SearchForm/SearchForm';
import { IPeople } from 'interfaces/interfaces';
import Item from './../../components/Item/Item';
import search from './../../services/SWAPI/SWAPI';

class SearchPage extends React.Component {
  state = {
    value: [
      {
        birth_year: '',
        eye_color: '',
        films: [''],
        gender: '',
        hair_color: '',
        height: '',
        homeworld: '',
        mass: '',
        name: '',
        skin_color: '',
        created: '',
        edited: '',
        species: [''],
        starships: [''],
        url: '',
        vehicles: [''],
      },
    ],
  };

  updateData = (value: IPeople[]) => {
    this.setState({ value: value });
  };

  componentDidMount(): void {
    if (localStorage.getItem('SW_search_req') !== null) {
      const searchReq = localStorage.getItem('SW_search_req');
      if (searchReq !== null) {
        search(searchReq).then((res) => {
          if (res !== undefined) {
            this.setState({ value: res });
          }
        });
      }
    }
  }

  render() {
    const itemElements = this.state.value.map((item) => (
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
    ));

    if (this.state.value[0].name === '') {
      return (
        <div className="search-page">
          <section className="search">
            <SearchForm class="search-form" updateData={this.updateData} />
          </section>
          <section className="results"></section>
        </div>
      );
    }
    return (
      <div className="search-page">
        <section className="search">
          <SearchForm class="search-form" updateData={this.updateData} />
        </section>
        <section className="results">{itemElements}</section>
      </div>
    );
  }
}

export default SearchPage;
