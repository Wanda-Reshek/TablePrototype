import styles from './NavItem.module.css';

/**
 * NavItem — a single selectable page link inside the sidebar.
 *
 * NavItems live inside a NavCategory. They have no icon of their own;
 * their left padding creates the visual indent under the category row.
 * Selecting a NavItem changes its text weight (400 → 600) and color,
 * but does NOT change its own background — the parent NavCategory
 * handles that.
 */
export default function NavItem({ label, selected = false, onClick, count }) {
  return (
    <button
      className={`${styles.item} ${selected ? styles.selected : ''}`}
      onClick={onClick}
      aria-current={selected ? 'page' : undefined}
    >
      <span className={styles.label}>{label}</span>
      {count != null && <span className={styles.count}>{count}</span>}
    </button>
  );
}
