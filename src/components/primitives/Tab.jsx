import styles from './Tab.module.css';

/**
 * Tab — a single tab button.
 *
 * Props:
 *   label    string    Display text
 *   count    number    Optional counter badge
 *   selected boolean   Whether this tab is active
 *   onClick  function  Called when clicked
 */
export default function Tab({ label, count, selected = false, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      className={`${styles.tab} ${selected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      {count != null && (
        <span className={styles.count}>{count}</span>
      )}
    </button>
  );
}
