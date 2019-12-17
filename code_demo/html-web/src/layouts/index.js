import styles from './index.css';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to login!</h1>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

// export default BasicLayout;
export default withRouter(connect()(BasicLayout));
