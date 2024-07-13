import { useRouteError, Link } from 'react-router-dom';
import './ErrorPage.css';
type ErrorResponse = {
  status: number;
  statusText: string;
  message: string;
};

const ErrorPage = () => {
  const error = useRouteError() as ErrorResponse;
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="error-page__status">{error.status}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="button error-page__button">
        Back
      </Link>
    </div>
  );
};

export default ErrorPage;
