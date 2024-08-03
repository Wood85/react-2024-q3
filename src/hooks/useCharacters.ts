import useSWR from 'swr';
import { IResponse } from '../interfaces/interfaces';

const fetchCharacters = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error('Failed to fetch characters');
  }

  return response.json();
};

function useCharacters(req: string, page: number) {
  const { data, error, isLoading } = useSWR<IResponse>(
    `https://swapi.dev/api/people/?search=${req}&page=${page}`,
    fetchCharacters,
  );

  return {
    characters: data,
    isLoading,
    isError: error,
  };
}

export default useCharacters;
