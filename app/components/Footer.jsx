import Image from 'next/image';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Image
            className={styles.logoIcon}
            src="/favicon.ico"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          <span className={styles.name}>Faria Tasnim</span>
        </div>
        <p className={styles.text}>Ph.D. Candidate · Mathematical Sciences · Michigan Tech</p>
        <a href="https://www.linkedin.com/in/fariatasnimmtu/" target="_blank" rel="noopener noreferrer" className={styles.link}>
          LinkedIn ↗
        </a>
      </div>
    </footer>
  );
}
