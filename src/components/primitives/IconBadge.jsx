import styles from './IconBadge.module.css';

/**
 * IconBadge — a small square badge wrapping a 20px status icon.
 *
 * Props:
 *   variant — 'pending' | 'confirmed' | 'approved' | 'delegated'
 *   icon    — ReactNode (20×20 icon element)
 */
export default function IconBadge({ variant = 'pending', icon }) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      <span className={styles.iconWrap}>{icon}</span>
    </span>
  );
}
