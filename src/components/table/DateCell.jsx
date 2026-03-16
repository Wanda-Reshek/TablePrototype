import styles from './DateCell.module.css';

/**
 * Formats an ISO datetime string into two lines:
 *   "6 Jan 2024"
 *   "13:00 GMT"
 */
function formatDate(isoString) {
  const d = new Date(isoString);
  const date = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'GMT',
  }).format(d); // "6 Jan 2024"

  const time = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'GMT',
    hour12: false,
  }).format(d) + ' GMT'; // "13:00 GMT"

  return { date, time };
}

export default function DateCell({ value }) {
  if (!value) return null;
  const { date, time } = formatDate(value);
  return (
    <div className={styles.cell}>
      <span className={styles.date}>{date}</span>
      <span className={styles.time}>{time}</span>
    </div>
  );
}
