import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import styles from './Item.module.css';
import { useGetInfoMutation } from './../../services/SWAPI/SWAPI';
import { arrOfSelected } from './../../store/reducers/selectedCharactersSlice';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { IPeople } from './../../interfaces/interfaces';
import SelectFlag from './../../components/SelectFlag/SelectFlag';

export interface IItemProps {
  name: string;
  gender: string;
  url: string;
}

const Item = (props: Readonly<IItemProps>) => {
  const param = props.url.slice(22);
  const details = props.url.slice(29, -1);
  const dispatch = useAppDispatch();
  const selectedArr = useAppSelector((state) => state.selected.selected);
  const router = useRouter();

  const search = useSearchParams();
  const searchQuery = search.get('search') ? search.get('search') : null;
  const pageQuery = search.get('page') ? search.get('page') : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');

  const [getInfo] = useGetInfoMutation();

  const handleGetInfo = async () => {
    router.push(`?search=${encodedSearchQuery}&page=${pageQuery}&details=${details}`);
  };

  const pushSelectedCharacter = async (arr: IPeople[]) => {
    const res = await getInfo(param).unwrap();
    arr.push(res);
    dispatch(arrOfSelected(arr));
  };

  function handleChange(url: string) {
    const arr = [...selectedArr];
    let index = -1;

    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].url === url) {
          index = i;
        }
      }
    }

    if (index === -1) {
      pushSelectedCharacter(arr);
    }
    if (index !== undefined && index > -1) {
      arr.splice(index, 1);
      dispatch(arrOfSelected(arr));
    }
  }

  return (
    <div
      className={styles.item}
      data-testid="item"
      onClick={(e) => {
        e.stopPropagation();
        handleGetInfo();
      }}
    >
      <h2 className={`${styles.name} ${styles.field}`}>{props.name}</h2>
      <div className={`${styles.gender} ${styles.field}`}>gender: {props.gender}</div>
      <SelectFlag name={props.name} />
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={styles.checkbox}
          onClick={() => {
            handleChange(props.url);
          }}
        ></div>
      </div>
    </div>
  );
};

export default Item;
