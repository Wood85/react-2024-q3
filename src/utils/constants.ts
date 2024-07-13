import { IPeople, IResponse } from 'interfaces/interfaces';

export const emptyValue: IPeople[] | undefined = [
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
];

export const emptyData: IResponse = {
  count: -1,
  next: null,
  previous: null,
  results: [],
};

export const NUM_PER_PAGE: number = 10;
