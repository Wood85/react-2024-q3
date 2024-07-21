import './Item.css';
import { useGetInfoMutation } from './../../services/SWAPI/SWAPI';
import { setCurrentInfo, showInfo } from './../../store/reducers/infoSlice';
import { useAppDispatch } from './../../hooks/redux';

export interface IItemProps {
  name: string;
  gender: string;
  url: string;
}

const Item = (props: Readonly<IItemProps>) => {
  const param = props.url.slice(22);
  const dispatch = useAppDispatch();

  const [getInfo] = useGetInfoMutation();

  const handleGetInfo = async () => {
    const res = await getInfo(param).unwrap();
    dispatch(setCurrentInfo(res));
    dispatch(showInfo(true));
  };
  return (
    <div
      className="item"
      onClick={(e) => {
        e.stopPropagation();
        handleGetInfo();
      }}
    >
      <h2 className="name field">{props.name}</h2>
      <div className="gender field">gender: {props.gender}</div>
    </div>
  );
};

export default Item;
