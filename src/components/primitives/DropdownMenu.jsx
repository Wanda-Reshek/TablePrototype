import styles from './DropdownMenu.module.css';

/**
 * DropdownMenu — a context/action menu popover.
 *
 * Props:
 *   items — array of item descriptors:
 *     {
 *       label:    string          — display text
 *       icon:     ReactNode       — 20×20 icon element (optional)
 *       danger:   bool            — red destructive style
 *       divider:  bool            — renders a divider ABOVE this item
 *       onClick:  () => void
 *     }
 */
export default function DropdownMenu({ items = [] }) {
  return (
    <div className={styles.menu} role="menu">
      {items.map((item, index) => (
        <div key={index}>
          {item.divider && <div className={styles.divider} role="separator" />}
          <button
            type="button"
            role="menuitem"
            className={`${styles.item} ${item.danger ? styles.danger : ''}`}
            onClick={item.onClick}
          >
            {item.icon && (
              <span className={styles.iconWrap} aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className={styles.label}>{item.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
