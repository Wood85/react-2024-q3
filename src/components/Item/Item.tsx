import './Item.css';
import { useState } from 'react';
import { useGetInfoMutation } from './../../services/SWAPI/SWAPI';
import { setCurrentInfo, showInfo } from './../../store/reducers/infoSlice';
import { arrOfSelected } from './../../store/reducers/selectedCharactersSlice';
import { useAppSelector, useAppDispatch } from './../../hooks/redux';
import { IPeople } from 'interfaces/interfaces';

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

  const pushSelectedCharacter = async (arr: IPeople[]) => {
    const res = await getInfo(param).unwrap();
    arr.push(res);
    dispatch(arrOfSelected(arr));
  };

  const selectedArr = useAppSelector((state) => state.selected.selected);
  const page = useAppSelector((state) => state.characters.data.results);

  const [isChecked, setIsChecked] = useState(false);

  function handleChange(url: string) {
    const arr = [...selectedArr];
    console.log(arr);
    let index = -1;

    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].url === url) {
          index = i;
          console.log(i);
        }
      }
    }

    if (index === -1) {
      pushSelectedCharacter(arr);
      console.log(selectedArr);
    }
    if (index !== undefined && index > -1) {
      arr.splice(index, 1);
      dispatch(arrOfSelected(arr));
      console.log(selectedArr);
    }
  }

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
      {isChecked ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="checkbox checkbox_checked"
            onClick={() => {
              handleChange(props.url);
            }}
          ></div>
        </div>
      ) : (
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            className="checkbox"
            onClick={() => {
              handleChange(props.url);
            }}
          ></div>
        </div>
      )}
      {/* <label
        className="check"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <input
          type="checkbox"
          checked={isChecked}
          className="check__input"
          onChange={() => {
            handleChange(props.name);
          }}
          // onClick={(e) => {
          //   e.preventDefault();
          //   handleChange(props.name);
          // }}
        />
        {<span className="check__box"></span>}
      </label> */}
    </div>
  );
};

export default Item;
