import { IResponse } from 'interfaces/interfaces';

export async function search(req: string, page?: number): Promise<IResponse> {
  let url: string;
  if (page) {
    url = `https://swapi.dev/api/people/?search=${req}&page=${page}`;
  } else {
    url = `https://swapi.dev/api/people/?search=${req}`;
  }
  const response = await fetch(url);
  const json = await response.json();
  return json;
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // } else {
  //   const json = await response.json();
  //   return json;
  // }
}

export async function searchFullAddress(address: string): Promise<IResponse> {
  const response = await fetch(address);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    const json = await response.json();
    return json;
  }
}
