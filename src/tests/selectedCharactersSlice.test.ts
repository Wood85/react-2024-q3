import selectedCharactersReducer, { arrOfSelected } from './../store/reducers/selectedCharactersSlice';
import { character } from './mockStore';

describe('selectedCharactersReducer', () => {
  test('should return default state when passed an empty action', () => {
    const result = selectedCharactersReducer(undefined, { type: '' });
    expect(result).toEqual({ selected: [] });
  });

  test('should set current data with "arrOfSelected" action', () => {
    const payload = [character];
    const action = { type: arrOfSelected.type, payload };

    const result = selectedCharactersReducer({ selected: [] }, action);

    expect(result.selected[0].name).toBe('Luke Skywalker');
    expect(result.selected[0].url).toBe('https://swapi.dev/api/people/1/');
    expect(result.selected[0].films[1]).toBe('https://swapi.dev/api/films/2/');
    expect(result.selected[1]).toBe(undefined);
  });
});
