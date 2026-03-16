import { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import IconButton from '../primitives/IconButton';
import Tooltip from '../primitives/Tooltip';
import DropdownMenu from '../primitives/DropdownMenu';
import styles from './RowActionsCell.module.css';
import confirmIcon from '../../Icons/Owners-Confirmation.svg';
import approvalIcon from '../../Icons/Approval.svg';
import moreIcon from '../../Icons/More.svg';
import attachmentsIcon from '../../Icons/Attachments.svg';
import downloadIcon from '../../Icons/Download.svg';
import duplicateIcon from '../../Icons/Duplicate.svg';
import deleteIcon from '../../Icons/Delete.svg';

function Img({ src, size = 20 }) {
  return <img src={src} width={size} height={size} alt="" aria-hidden="true" />;
}

export default function RowActionsCell({ row }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreBtnHovered, setMoreBtnHovered] = useState(false);
  const moreRef = useRef(null);

  const menuItems = [
    { label: 'Attachments', icon: <Img src={attachmentsIcon} />, onClick: () => {} },
    { label: 'Download', icon: <Img src={downloadIcon} />, onClick: () => {} },
    { label: 'Duplicate', icon: <Img src={duplicateIcon} />, onClick: () => {} },
    { label: 'Delete', icon: <Img src={deleteIcon} />, danger: true, divider: true, onClick: () => {} },
  ];

  function openMenu() {
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  // Position the dropdown below the More button
  const anchorRect = menuOpen && moreRef.current
    ? moreRef.current.getBoundingClientRect()
    : null;

  // Position the tooltip above the More button
  const tooltipRect = moreBtnHovered && !menuOpen && moreRef.current
    ? moreRef.current.getBoundingClientRect()
    : null;

  return (
    <div className={styles.actions} data-menu-open={menuOpen || undefined}>
      <IconButton
        icon={<Img src={confirmIcon} />}
        label="Request Owner's confirmation"
        onClick={() => {}}
      />
      <IconButton
        icon={<Img src={approvalIcon} />}
        label="Request approval"
        onClick={() => {}}
      />
      <div ref={moreRef} className={styles.moreWrapper}>
        <button
          type="button"
          className={`${styles.moreBtn} ${menuOpen ? styles.moreBtnActive : ''}`}
          aria-label="More actions"
          onMouseEnter={() => setMoreBtnHovered(true)}
          onMouseLeave={() => setMoreBtnHovered(false)}
          onClick={menuOpen ? closeMenu : openMenu}
        >
          <Img src={moreIcon} />
        </button>

        {/* Tooltip — portalled to body so it paints above sticky thead */}
        {tooltipRect && ReactDOM.createPortal(
          <div
            className={styles.tooltipPortal}
            style={{
              top: tooltipRect.top - 4,
              left: tooltipRect.left + tooltipRect.width / 2,
            }}
          >
            <Tooltip placement="top">More</Tooltip>
          </div>,
          document.body
        )}

        {menuOpen && anchorRect && ReactDOM.createPortal(
          <>
            {/* backdrop to close on outside click */}
            <div className={styles.backdrop} onMouseDown={closeMenu} />
            <div
              className={styles.dropdownPortal}
              style={{ top: anchorRect.bottom + 4, right: window.innerWidth - anchorRect.right }}
            >
              <DropdownMenu items={menuItems} />
            </div>
          </>,
          document.body
        )}
      </div>
    </div>
  );
}
