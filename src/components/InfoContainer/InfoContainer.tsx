import './InfoContainer.css';
import Info from './../Info/Info';
import { IPeople } from './../../interfaces/interfaces';

export interface IInfoContainerProps {
  info: IPeople;
  isLoading: boolean;
  handleCloseClick: () => void;
}

const InfoContainer = () => {
  return (
    <div className="info-container">
      <Info />
    </div>
  );
};

export default InfoContainer;
