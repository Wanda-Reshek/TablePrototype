import styles from './OrgUserCard.module.css';

/**
 * OrgUserCard — shows the active organisation + user as a pressable card.
 * Sits at the top of the sidebar; triggers an org/account switcher on click.
 *
 * Props:
 *   orgName    string   Organisation display name  (e.g. "North Chemicals")
 *   userName   string   User display name          (e.g. "Molly Petersen")
 *   initials   string   1–2 letter avatar initials (e.g. "MP")
 *   avatarColor string  CSS color for avatar bg    (default: brand purple)
 *   onClick    function Called when the card is clicked
 */
export default function OrgUserCard({
  orgName,
  userName,
  initials = '??',
  avatarColor = '#7E57EF',
  onClick,
}) {
  return (
    <button className={styles.card} onClick={onClick} type="button">
      <span className={styles.avatar} style={{ backgroundColor: avatarColor }}>
        {initials}
      </span>

      <span className={styles.text}>
        <span className={styles.orgName}>{orgName}</span>
        <span className={styles.userName}>{userName}</span>
      </span>

      <ChevronRightIcon />
    </button>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className={styles.chevron}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
