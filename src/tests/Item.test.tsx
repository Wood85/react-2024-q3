import { render, screen } from '@testing-library/react';
import Item from './../components/Item/Item';
import { IItemProps } from './../components/Item/Item';

const onClickItem = vi.fn();

describe('Item', () => {
  it('should render character name and gender', () => {
    const character: IItemProps = {
      name: 'Luke',
      gender: 'male',
      url: 'https://swapi.dev/api/people/1/',
      onClick: onClickItem,
    };
    render(
      <Item
        key={crypto.randomUUID()}
        name={character.name}
        gender={character.gender}
        url={character.url}
        onClick={character.onClick}
      />,
    );
    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByText(`gender: ${character.gender}`)).toBeInTheDocument();
  });
});
