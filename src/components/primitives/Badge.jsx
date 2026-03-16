import styles from './Badge.module.css';

/**
 * Badge — a doc status pill.
 *
 * Props:
 *   variant — 'drafted' | 'final-draft' | 'drafting' | 'pending-issuing'
 *   label   — override display text (defaults to the variant label)
 */
const LABELS = {
  'drafted':         'Drafted',
  'final-draft':     'Final draft',
  'drafting':        'Drafting',
  'pending-issuing': 'Pending issuing',
};

export default function Badge({ variant = 'drafted', label }) {
  const variantClass = styles[variant] ?? styles['drafted'];
  return (
    <span className={`${styles.badge} ${variantClass}`}>
      {label ?? LABELS[variant]}
    </span>
  );
}
