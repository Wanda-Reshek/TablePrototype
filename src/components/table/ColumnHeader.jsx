import styles from './ColumnHeader.module.css';
import arrowUp from '../../Icons/arrow-up.svg';
import filterIcon from '../../Icons/filter.svg';

/**
 * Visual header cell — goes inside TanStack's <th>.
 * Handles all visual states: default, hover, sorted, filtered, menu-open.
 */
export default function ColumnHeader({ label, sorted, filtered, active, onClick }) {
  const hasActiveState = Boolean(sorted || filtered);

  function handleClick(e) {
    const th = e.currentTarget.closest('th');
    onClick?.(e, th);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e);
    }
  }

  return (
    <div
      className={`${styles.cell} ${active ? styles.cellActive : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <span className={`${styles.label} ${hasActiveState ? styles.labelDark : ''}`}>
        {label}
      </span>

      {/* Sort arrow — visible only when actively sorted */}
      {sorted && (
        <img
          src={arrowUp}
          className={`${styles.sortIcon} ${sorted === 'desc' ? styles.sortDesc : ''}`}
          alt={sorted === 'asc' ? 'sorted ascending' : 'sorted descending'}
        />
      )}

      {/* Filter icon — ghost on hover, solid when filtered or menu open */}
      <img
        src={filterIcon}
        className={`${styles.filterIcon} ${(filtered || active) ? styles.filterIconActive : ''}`}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
