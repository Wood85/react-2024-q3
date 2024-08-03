import styles from './ItemList.module.css';
import useCharacters from '../../hooks/useCharacters';
import { useAppDispatch } from './../../hooks/redux';
import { setCurrentCharacters, pageNum } from '../../store/reducers/charactersSlice';
import Spinner from './../spinner/spinner';
import NotFound from './../NotFound/NotFound';
import Fallback from './../Fallback/Fallback';
import Item from './../Item/Item';
import { useSearchParams } from 'next/navigation';

const ItemList = () => {
  const search = useSearchParams();
  const searchQuery = search.get('search') ? search.get('search') : null;
  const pageQuery = search.get('page') ? search.get('page') : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const { characters, isLoading } = useCharacters(encodedSearchQuery, Number(pageQuery));
  const dispatch = useAppDispatch();
  if (characters) dispatch(setCurrentCharacters(characters));
  if (pageQuery !== null) dispatch(pageNum(Number(pageQuery)));

  return (
    <div className={styles.items} data-testid="item-list">
      {isLoading ? (
        <Spinner />
      ) : characters === undefined ? (
        <Fallback message="Invalid request" />
      ) : characters.count === 0 ? (
        <NotFound />
      ) : (
        characters.results.map((item) => (
          <Item key={crypto.randomUUID()} name={item.name} gender={item.gender} url={item.url} />
        ))
      )}
    </div>
  );
};

export default ItemList;
