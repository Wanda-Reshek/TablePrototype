import { useState, Children } from 'react';
import styles from './SidebarEntry.module.css';

/** Inline chevron SVG — no external dependency needed */
function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * SidebarEntry — a high-level item in the sidebar.
 *
 * Two modes (auto-detected from children):
 *   - Accordion: children present → toggles sub-items on click.
 *   - Button:    no children     → fires `onClick` directly.
 *
 * Props:
 *   icon             ReactNode   Icon element (SVG)
 *   label            string      Display label
 *   active           boolean     Is selected or has a selected child
 *   defaultExpanded  boolean     Accordion: start open
 *   sidebarCollapsed boolean     Sidebar is in narrow / icon-only mode
 *   onClick          function    Button mode: called when the entry is clicked
 *   children         ReactNode   Sub-items — presence enables accordion mode
 */
export default function SidebarEntry({
  icon,
  label,
  active = false,
  defaultExpanded = false,
  sidebarCollapsed = false,
  onClick,
  children,
}) {
  const isAccordion = Children.count(children) > 0;
  const [open, setOpen] = useState(defaultExpanded);

  function handleClick() {
    if (sidebarCollapsed && isAccordion) return; // only block accordion toggle in collapsed mode
    if (isAccordion) {
      setOpen((o) => !o);
    } else if (onClick) {
      onClick();
    }
  }

  const wrapperClass = [
    styles.entry,
    active ? styles.active : '',
    sidebarCollapsed ? styles.sidebarCollapsed : '',
  ].filter(Boolean).join(' ');

  const itemsClass = [
    styles.items,
    !sidebarCollapsed && open ? styles.itemsOpen : '',
    sidebarCollapsed ? styles.itemsHidden : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      <button
        className={styles.header}
        onClick={handleClick}
        aria-expanded={isAccordion && !sidebarCollapsed ? open : undefined}
      >
        {/* Collapsed: active entries get a bg pill; inactive just show the icon */}
        {sidebarCollapsed ? (
          active ? (
            <span className={styles.activeIconPill}>
              <span className={styles.icon}>{icon}</span>
            </span>
          ) : (
            <span className={styles.icon}>{icon}</span>
          )
        ) : (
          <span className={styles.icon}>{icon}</span>
        )}

        <span className={`${styles.label} ${sidebarCollapsed ? styles.labelHidden : ''}`}>
          {label}
        </span>

        {isAccordion && (
          <span className={`${styles.chevron} ${open ? styles.chevronOpen : ''} ${sidebarCollapsed ? styles.chevronHidden : ''}`}>
            <ChevronIcon />
          </span>
        )}
      </button>

      {isAccordion && (
        <div className={itemsClass}>
          {children}
        </div>
      )}
    </div>
  );
}
