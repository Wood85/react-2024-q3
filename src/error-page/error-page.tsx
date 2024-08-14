import styles from './error-page.module.css';
import { useRouteError } from 'react-router-dom';

interface RouteError {
  data: string;
  error: {
    columnNumber: number;
    fileName: string;
    lineNumber: number;
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
  statusText: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Oops!</h1>
        <h2>Sorry, an unexpected error has occurred.</h2>
        <p>
          <i>{error.statusText || error.error.message}</i>
        </p>
      </div>
    </div>
  );
}
