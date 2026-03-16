import styles from './Chip.module.css';

/**
 * Chip — a compact clickable pill used in table cells to show linked counts.
 *
 * Props:
 *   icon     — ReactNode (rendered at 14×14px)
 *   children — label / count text
 *   onClick  — click handler
 */
export default function Chip({ icon, children, onClick }) {
  return (
    <button type="button" className={styles.chip} onClick={onClick}>
      {icon && <span className={styles.iconWrap}>{icon}</span>}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
