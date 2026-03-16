import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './ColumnHeaderMenu.module.css';
import crossS from '../../Icons/cross-S.svg';

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.25" stroke="#68695b" strokeWidth="1.5" />
      <path d="M13 13L16.5 16.5" stroke="#68695b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10.5L8 14.5L16 6.5" stroke="#203209" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ColumnHeaderMenu({ column, anchorEl, onClose }) {
  const [filterValue, setFilterValue] = useState(column.getFilterValue() ?? '');
  const menuRef = useRef(null);
  const rect = anchorEl.getBoundingClientRect();
  const sorted = column.getIsSorted(); // 'asc' | 'desc' | false

  useEffect(() => {
    function handlePointer(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !anchorEl.contains(e.target)
      ) {
        onClose();
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [anchorEl, onClose]);

  function handleSearch(e) {
    const val = e.target.value;
    setFilterValue(val);
    column.setFilterValue(val || undefined);
  }

  return ReactDOM.createPortal(
    <div
      ref={menuRef}
      className={styles.menu}
      style={{ top: rect.bottom + 4, left: rect.left }}
    >
      {/* Search */}
      <div className={styles.searchWrapper}>
        <label className={styles.searchField}>
          <SearchIcon />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            value={filterValue}
            onChange={handleSearch}
            autoFocus
          />
          {filterValue && (
            <button
              className={styles.clearBtn}
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setFilterValue('');
                column.setFilterValue(undefined);
              }}
            >
              <img src={crossS} alt="" aria-hidden="true" width={12} height={12} />
            </button>
          )}
        </label>
      </div>

      {/* Sort options */}
      <div className={styles.items}>
        <button
          className={styles.item}
          onClick={() => { column.toggleSorting(false); onClose(); }}
        >
          <span className={`${styles.itemIcon} ${sorted === 'asc' ? '' : styles.iconHidden}`}>
            <CheckIcon />
          </span>
          <span className={styles.itemLabel}>Sort A to Z</span>
        </button>
        <button
          className={styles.item}
          onClick={() => { column.toggleSorting(true); onClose(); }}
        >
          <span className={`${styles.itemIcon} ${sorted === 'desc' ? '' : styles.iconHidden}`}>
            <CheckIcon />
          </span>
          <span className={styles.itemLabel}>Sort Z to A</span>
        </button>
      </div>
    </div>,
    document.body
  );
}
