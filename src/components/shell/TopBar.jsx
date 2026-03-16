import styles from './TopBar.module.css';

export default function TopBar({ title = 'Data Table' }) {
  return (
    <header className={styles.topbar}>
      <span className={styles.title}>{title}</span>
      <div className={styles.actions}>
        <span className={styles.avatar}>JD</span>
      </div>
    </header>
  );
}
