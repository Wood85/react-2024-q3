import { beforeAll, describe, expect, test } from 'vitest';
import { search, searchFullAddress, searchCharacter } from './../services/SWAPI/SWAPI';

describe('Request search', () => {
  let response: Response;
  const json = search('y', 1);
  beforeAll(async () => {
    response = await fetch('https://swapi.dev/api/people/?search=y&page=1');
  }, 3000);

  test('Should have response status 200', () => {
    expect(response.status).toBe(200);
  });
  test('Should exist', () => {
    expect(json).toBeTruthy();
  });
});

describe('Request search', () => {
  let response: Response;
  const json = searchFullAddress('https://swapi.dev/api/people/?search=y&page=1');
  beforeAll(async () => {
    response = await fetch('https://swapi.dev/api/people/?search=y&page=1');
  }, 3000);

  test('Should have response status 200', () => {
    expect(response.status).toBe(200);
  });
  test('Should exist', () => {
    expect(json).toBeTruthy();
  });
});

describe('Request search', () => {
  let response: Response;
  const json = searchCharacter('https://swapi.dev/api/people/1');
  beforeAll(async () => {
    response = await fetch('https://swapi.dev/api/people/1');
  }, 3000);

  test('Should have response status 200', () => {
    expect(response.status).toBe(200);
  });
  test('Should exist', () => {
    expect(json).toBeTruthy();
  });
});
