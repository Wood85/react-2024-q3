import { render, screen } from '@testing-library/react';
import Info from './../components/Info/Info';
import { IInfoProps } from './../components/Info/Info';

const handleCloseClick = vi.fn();

describe('Info', () => {
  it('should render information about a character', () => {
    const infoCharacter = {
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
    };
    const character: IInfoProps = { info: infoCharacter, handleCloseClick: handleCloseClick };
    render(<Info info={character.info} handleCloseClick={character.handleCloseClick} />);
    expect(screen.getByText(character.info.name)).toBeInTheDocument();
    expect(screen.getByText(`gender: ${character.info.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`birth year: ${character.info.birth_year}`)).toBeInTheDocument();
    expect(screen.getByText(`height: ${character.info.height}`)).toBeInTheDocument();
    expect(screen.getByText(`mass: ${character.info.mass}`)).toBeInTheDocument();
    expect(screen.getByText(`hair color: ${character.info.hair_color}`)).toBeInTheDocument();
    expect(screen.getByText(`skin color: ${character.info.skin_color}`)).toBeInTheDocument();
    expect(screen.getByText(`eye color: ${character.info.eye_color}`)).toBeInTheDocument();
  });
});
