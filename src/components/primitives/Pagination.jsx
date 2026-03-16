import styles from './Pagination.module.css';
import chevronDown from '../../Icons/Sidebar_Icons/chevron-down.svg';

export default function Pagination({
  page = 1,
  pageSize = 50,
  total = 0,
  pageSizes = [25, 50, 100],
  onPageChange,
  onPageSizeChange,
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className={styles.pagination}>
      <div className={styles.left}>
        <span className={styles.label}>Show</span>
        <div className={styles.selectWrapper}>
          <select
            className={styles.select}
            value={pageSize}
            onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
          >
            {pageSizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <img
            src={chevronDown}
            className={styles.selectChevron}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={styles.right}>
        <span className={styles.rangeText}>
          {start}–{end} of {total}
        </span>
        <div className={styles.navButtons}>
          <button
            className={styles.navBtn}
            onClick={() => onPageChange?.(page - 1)}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <img
              src={chevronDown}
              className={styles.prevIcon}
              alt=""
              aria-hidden="true"
            />
          </button>
          <button
            className={styles.navBtn}
            onClick={() => onPageChange?.(page + 1)}
            disabled={page >= totalPages}
            aria-label="Next page"
          >
            <img
              src={chevronDown}
              className={styles.nextIcon}
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
