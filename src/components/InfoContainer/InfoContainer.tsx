import './InfoContainer.css';
import Spinner from './../spinner/spinner';
import Info from './../Info/Info';
import { IPeople } from './../../interfaces/interfaces';

export interface IInfoContainerProps {
  info: IPeople;
  isLoading: boolean;
  handleCloseClick: () => void;
}

const InfoContainer = (props: IInfoContainerProps) => {
  return (
    <div className="info-container">
      {props.isLoading === true ? <Spinner /> : <Info info={props.info} handleCloseClick={props.handleCloseClick} />}
    </div>
  );
};

export default InfoContainer;
