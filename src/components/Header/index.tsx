import Link from 'next/link';

import commonStyles from '../../styles/common.module.scss'
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <div className={`${commonStyles.container} ${styles.header}`}>
      <Link href="/">
        <a>
          <img src="../Logo.svg" alt="logo" />
        </a>
      </Link>
    </div>    
  );
}