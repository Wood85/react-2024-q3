import { render, screen } from '@testing-library/react';
import ItemList from './../components/ItemList/ItemList';
import { IItemListProps } from './../components/ItemList/ItemList';

describe('ItemList', () => {
  const onClickItem = vi.fn();

  it('should render a ItemList component', () => {
    const list: IItemListProps = {
      isLoading: false,
      count: 1,
      results: [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
            'https://swapi.dev/api/films/6/',
          ],
          species: [],
          vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
          starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
      onClick: onClickItem,
    };
    render(<ItemList isLoading={list.isLoading} count={list.count} results={list.results} onClick={list.onClick} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should render NotFound a component with the text: Character Not Found', () => {
    const list: IItemListProps = {
      isLoading: false,
      count: 0,
      results: [],
      onClick: onClickItem,
    };
    render(<ItemList isLoading={list.isLoading} count={list.count} results={list.results} onClick={list.onClick} />);

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('should render a Spinner component', () => {
    const list: IItemListProps = {
      isLoading: true,
      count: 2,
      results: [
        {
          name: 'Terminator',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
            'https://swapi.dev/api/films/6/',
          ],
          species: [],
          vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
          starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.dev/api/people/1/',
        },
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          homeworld: 'https://swapi.dev/api/planets/1/',
          films: [
            'https://swapi.dev/api/films/1/',
            'https://swapi.dev/api/films/2/',
            'https://swapi.dev/api/films/3/',
            'https://swapi.dev/api/films/6/',
          ],
          species: [],
          vehicles: ['https://swapi.dev/api/vehicles/14/', 'https://swapi.dev/api/vehicles/30/'],
          starships: ['https://swapi.dev/api/starships/12/', 'https://swapi.dev/api/starships/22/'],
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:56.891000Z',
          url: 'https://swapi.dev/api/people/1/',
        },
      ],
      onClick: onClickItem,
    };
    render(<ItemList isLoading={list.isLoading} count={list.count} results={list.results} onClick={list.onClick} />);
    expect(screen.getByLabelText('oval-loading')).toBeInTheDocument();
  });
});
