'use client';
import styles from './ItemList.module.css';
import { useAppSelector } from './../../hooks/redux';
import Spinner from './../spinner/spinner';
import NotFound from './../NotFound/NotFound';
import Fallback from './../Fallback/Fallback';
import Item from './../Item/Item';

const ItemList = () => {
  const items = useAppSelector((state) => state.characters.data.results);
  const count = useAppSelector((state) => state.characters.data.count);
  const loading = useAppSelector((state) => state.characters.isLoading);

  return (
    <div className={styles.items} data-testid="item-list">
      {count === -1 || loading ? (
        <Spinner />
      ) : count === 0 ? (
        <NotFound />
      ) : items === undefined ? (
        <Fallback message="Invalid request" />
      ) : (
        items.map((item) => <Item key={crypto.randomUUID()} name={item.name} gender={item.gender} url={item.url} />)
      )}
    </div>
  );
};

export default ItemList;
