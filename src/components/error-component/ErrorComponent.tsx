import styles from './ErrorComponent.module.css';

interface Props {
  errors: string[];
}

const ErrorComponent = (props: Props) => {
  return (
    <div className={styles.container}>
      {props.errors.map((error) => (
        <div className={styles.error} key={crypto.randomUUID()}>
          {error}
        </div>
      ))}
    </div>
  );
};

export default ErrorComponent;
