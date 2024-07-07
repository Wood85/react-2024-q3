import { IPeople } from 'interfaces/interfaces';

async function search(req: string): Promise<IPeople[] | undefined> {
  const response = await fetch(`https://swapi.dev/api/people/?search=${req}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    const json = await response.json();
    if (json.results.length > 0) {
      return json.results;
    } else {
      return undefined;
    }
  }
}

export default search;
