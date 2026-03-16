import { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './Tooltip';
import styles from './IconButton.module.css';

/**
 * IconButton — a square icon-only button.
 *
 * Props:
 *   icon      — ReactNode (the icon to render)
 *   label     — string, used as aria-label and tooltip text
 *   disabled  — bool
 *   onClick   — click handler
 */
export default function IconButton({ icon, label, disabled = false, onClick }) {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef(null);

  const rect = hovered && label && btnRef.current
    ? btnRef.current.getBoundingClientRect()
    : null;

  return (
    <div className={styles.wrapper}>
      {rect && ReactDOM.createPortal(
        <div
          className={styles.tooltipPortal}
          style={{
            top: rect.top - 4,
            left: rect.left + rect.width / 2,
          }}
        >
          <Tooltip placement="top">{label}</Tooltip>
        </div>,
        document.body
      )}
      <button
        ref={btnRef}
        type="button"
        className={styles.button}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
      >
        <span className={styles.iconWrap}>{icon}</span>
      </button>
    </div>
  );
}
