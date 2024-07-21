import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IPeople, IResponse } from 'interfaces/interfaces';

export interface ISearchQuery {
  req: string;
  page?: number;
}

export const swApi = createApi({
  reducerPath: 'swApi',
  tagTypes: ['Characters'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    getCharacters: build.mutation<IResponse, ISearchQuery>({
      query: ({ req, page = 1 }) => ({
        url: `people/?search=${req}&page=${page}`,
        method: 'GET',
      }),
    }),
    getInfo: build.mutation<IPeople, string>({
      query: (param) => ({
        url: param,
        method: 'GET',
      }),
    }),
    getPageByFullAddress: build.mutation<IResponse, string>({
      query: (param) => ({
        url: param,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetCharactersMutation, useGetInfoMutation, useGetPageByFullAddressMutation } = swApi;
