import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to login!</h1>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

export default BasicLayout;
