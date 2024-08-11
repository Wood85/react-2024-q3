import charactersReducer, { setCurrentCharacters, loading, pageNum } from './../store/reducers/charactersSlice';
import { emptyData } from './../utils/constants';
import { character } from './mockStore';

describe('charactersReducer', () => {
  test('should return default state when passed an empty action', () => {
    const result = charactersReducer(undefined, { type: '' });
    expect(result).toEqual({ data: emptyData, isLoading: false, pageNum: 1 });
  });

  test('should set current info with "setCurrentCharacters" action', () => {
    const data = {
      count: 1,
      next: null,
      previous: null,
      results: [character],
    };

    const action = { type: setCurrentCharacters.type, payload: data };

    const result = charactersReducer({ data: emptyData, isLoading: false, pageNum: 1 }, action);

    expect(result.data.count).toBe(1);
    expect(result.data.next).toBe(null);
    expect(result.data.previous).toBe(null);
    expect(result.data.results[0]).toBe(character);
    expect(result.data.results[1]).toBe(undefined);
  });

  test('should set loading status info with "loading" action', () => {
    const action = { type: loading.type, payload: true };

    const result = charactersReducer({ data: emptyData, isLoading: false, pageNum: 1 }, action);

    expect(result.isLoading).toBe(true);
  });

  test('should set page number with "pageNum" action', () => {
    const action = { type: pageNum.type, payload: 3 };

    const result = charactersReducer({ data: emptyData, isLoading: false, pageNum: 1 }, action);

    expect(result.pageNum).toBe(3);
  });
});
