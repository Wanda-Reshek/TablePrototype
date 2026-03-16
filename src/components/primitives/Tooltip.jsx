import styles from './Tooltip.module.css';

/**
 * Tooltip — bare visual component. Wrap a trigger + this in a
 * positioned container to control placement in the app.
 *
 * Props:
 *   children  — tooltip text / content
 *   placement — 'top' | 'bottom' | 'left' | 'right'  (default: 'top')
 *               Controls which side the arrow appears on.
 */
export default function Tooltip({ children, placement = 'top' }) {
  return (
    <div className={`${styles.tooltip} ${styles[placement]}`} role="tooltip">
      <div className={styles.box}>{children}</div>
      <div className={styles.arrow} aria-hidden="true" />
    </div>
  );
}
