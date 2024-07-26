import infoReducer, { setCurrentInfo, showInfo } from './../store/reducers/infoSlice';
import { emptyCharacter } from './../utils/constants';
import { character } from './mockStore';

describe('infoSlice', () => {
  test('should return default state when passed an empty action', () => {
    const result = infoReducer(undefined, { type: '' });
    expect(result).toEqual({ data: emptyCharacter, isShow: false });
  });

  test('should set current info with "setCurrentInfo" action', () => {
    const action = { type: setCurrentInfo.type, payload: character };

    const result = infoReducer({ data: emptyCharacter, isShow: false }, action);

    expect(result.data.name).toBe('Luke Skywalker');
    expect(result.data.height).toBe('172');
    expect(result.data.mass).toBe('77');
    expect(result.data.hair_color).toBe('blond');
    expect(result.data.skin_color).toBe('fair');
    expect(result.data.eye_color).toBe('blue');
    expect(result.data.birth_year).toBe('19BBY');
    expect(result.data.gender).toBe('male');
    expect(result.data.url).toBe('https://swapi.dev/api/people/1/');
    expect(result.data.films[2]).toBe('https://swapi.dev/api/films/3/');
  });

  test('should set visibility status info with "showInfo" action', () => {
    const action = { type: showInfo.type, payload: true };

    const result = infoReducer({ data: emptyCharacter, isShow: false }, action);

    expect(result.isShow).toBe(true);
  });
});
