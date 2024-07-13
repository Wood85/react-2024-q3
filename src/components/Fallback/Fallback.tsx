import './Fallback.css';

interface IFallbackProps {
  message: string;
}

const Fallback = (props: IFallbackProps) => {
  return <div className="fallback">{props.message}</div>;
};

export default Fallback;
