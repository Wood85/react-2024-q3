import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <div className={`${styles.page}`} data-testid="error-page">
      <h1>Oops!</h1>
      <p>This is not the page you are looking for</p>
    </div>
  );
};

export default ErrorPage;
