import './SelectFlag.css';
import { useAppSelector } from './../../hooks/redux';

interface ISelectFlagProps {
  name: string;
}

const SelectFlag = (props: ISelectFlagProps) => {
  const selectArr = useAppSelector((state) => state.selected.selected);
  const selectArrName = selectArr.map((item) => item.name);
  const check = selectArrName.includes(props.name);

  return check === false ? <div className="flag flag_hide"></div> : <div className="flag"></div>;
};

export default SelectFlag;
