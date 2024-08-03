import useSWR from 'swr';
import { IPeople } from '../interfaces/interfaces';

const fetchDetails = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error('Failed to fetch characters');
  }

  return response.json();
};

function useDetails(id: number) {
  const { data, error, isLoading } = useSWR<IPeople>(`https://swapi.dev/api/people/${id}`, fetchDetails);

  return {
    info: data,
    isLoading,
    isError: error,
  };
}

export default useDetails;
