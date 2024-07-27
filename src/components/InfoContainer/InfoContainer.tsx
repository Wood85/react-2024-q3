import './InfoContainer.css';
import Info from './../Info/Info';
import { IPeople } from './../../interfaces/interfaces';
import { useAppSelector } from './../../hooks/redux';
import Spinner from './../../components/spinner/spinner';

export interface IInfoContainerProps {
  info: IPeople;
  isLoading: boolean;
  handleCloseClick: () => void;
}

const InfoContainer = () => {
  const isLoading = useAppSelector((state) => state.info.loadingInfo);

  return (
    <div className="info-container" data-testid="info-container">
      {isLoading ? <Spinner /> : <Info />}
    </div>
  );
};

export default InfoContainer;
