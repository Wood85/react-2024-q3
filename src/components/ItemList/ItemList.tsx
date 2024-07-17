import { IPeople } from 'interfaces/interfaces';
import Spinner from './../spinner/spinner';
import NotFound from './../NotFound/NotFound';
import Fallback from './../Fallback/Fallback';
import Item from './../Item/Item';

export interface IItemListProps {
  isLoading: boolean;
  count: number;
  results: IPeople[];
  onClick: (url: string) => void;
}

const ItemList = (props: IItemListProps) => {
  return (
    <div className="items">
      {props.isLoading || props.count === -1 ? (
        <Spinner />
      ) : props.count === 0 ? (
        <NotFound />
      ) : props.results === undefined ? (
        <Fallback message="Invalid request" />
      ) : (
        props.results.map((item) => (
          <Item
            key={crypto.randomUUID()}
            name={item.name}
            gender={item.gender}
            url={item.url}
            onClick={props.onClick}
          />
        ))
      )}
    </div>
  );
};

export default ItemList;
