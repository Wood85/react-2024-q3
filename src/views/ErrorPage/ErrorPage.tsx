import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-page" data-testid="error-page">
      <h1>Oops!</h1>
      <p>This is not the page you are looking for</p>
      <Link to="/" className="button error-page__button">
        Back
      </Link>
    </div>
  );
};

export default ErrorPage;
