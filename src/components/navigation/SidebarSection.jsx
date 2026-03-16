import styles from './SidebarSection.module.css';

/**
 * SidebarSection — a logical group of SidebarEntry items.
 *
 * Props:
 *   children   ReactNode   SidebarEntry items
 *   label      string      Optional small-caps section heading
 *   grow       boolean     Whether this section should take up remaining flex space
 */
export default function SidebarSection({ children, label, grow = false }) {
  return (
    <div className={`${styles.section} ${grow ? styles.grow : ''}`}>
      {label && <span className={styles.label}>{label}</span>}
      {children}
    </div>
  );
}
