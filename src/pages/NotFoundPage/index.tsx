import { useLayoutEffect } from 'react';
import styles from './styles.module.scss';

const NotFoundPage = () => {
  useLayoutEffect(() => {
    document.title = `UserProfile | Not Found`;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>404</h1>
        <div>
          <p>Oops! It seems like you&apos;ve taken a wrong turn.</p>
          <p>Let&apos;s get you back on track.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
