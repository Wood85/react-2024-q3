type Category = 'films' | 'people' | 'planets' | 'species' | 'starships' | 'vehicles';
const attributes: Category[] = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

class SWAPI {
  static search(req: string): Promise<Response[]> {
    const requests = attributes.map((attribute) => fetch(`https://swapi.dev/api/${attribute}/?search=${req}`));
    return Promise.all(requests);
  }
}

export default SWAPI;
