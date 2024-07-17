import { render, screen } from '@testing-library/react';
import InfoContainer from './../components/InfoContainer/InfoContainer';
import { IInfoContainerProps } from './../components/InfoContainer/InfoContainer';

const handleCloseClick = vi.fn();

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

describe('InfoContainer', () => {
  it('should render InfoContainer with the information about a character ', () => {
    const infoContainer: IInfoContainerProps = {
      info: infoCharacter,
      isLoading: false,
      handleCloseClick,
    };

    render(
      <InfoContainer
        info={infoContainer.info}
        isLoading={infoContainer.isLoading}
        handleCloseClick={infoContainer.handleCloseClick}
      />,
    );
    expect(screen.getByText(infoContainer.info.name)).toBeInTheDocument();
    expect(screen.getByText(`gender: ${infoContainer.info.gender}`)).toBeInTheDocument();
    expect(screen.getByText(`birth year: ${infoContainer.info.birth_year}`)).toBeInTheDocument();
    expect(screen.getByText(`height: ${infoContainer.info.height}`)).toBeInTheDocument();
    expect(screen.getByText(`mass: ${infoContainer.info.mass}`)).toBeInTheDocument();
    expect(screen.getByText(`hair color: ${infoContainer.info.hair_color}`)).toBeInTheDocument();
    expect(screen.getByText(`skin color: ${infoContainer.info.skin_color}`)).toBeInTheDocument();
    expect(screen.getByText(`eye color: ${infoContainer.info.eye_color}`)).toBeInTheDocument();
  });

  it('should render InfoContainer with the Spinner component ', () => {
    const infoContainer: IInfoContainerProps = {
      info: infoCharacter,
      isLoading: true,
      handleCloseClick,
    };

    render(
      <InfoContainer
        info={infoContainer.info}
        isLoading={infoContainer.isLoading}
        handleCloseClick={infoContainer.handleCloseClick}
      />,
    );
    expect(screen.getByLabelText('oval-loading')).toBeInTheDocument();
  });
});
