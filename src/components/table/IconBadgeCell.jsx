import { createElement } from 'react';
import IconBadge from '../primitives/IconBadge';
import pendingIcon from '../../Icons/Pending.svg';
import confirmedIcon from '../../Icons/Owners-Confirmation.svg';
import approvalIcon from '../../Icons/Approval.svg';
import delegatedIcon from '../../Icons/Delegated.svg';
import styles from './IconBadgeCell.module.css';

const VARIANTS = {
  pending:          { label: 'Pending confirmation', icon: pendingIcon },
  confirmed:        { label: 'Confirmed and signed', icon: confirmedIcon },
  approved:         { label: 'Approved',             icon: approvalIcon },
  delegated:        { label: 'Delegated to me',      icon: delegatedIcon },
  'pending-approval': { label: 'Pending approval',  icon: pendingIcon },
};

function Img({ src }) {
  return createElement('img', { src, width: 20, height: 20, alt: '', 'aria-hidden': true });
}

export default function IconBadgeCell({ variant }) {
  const config = VARIANTS[variant] ?? VARIANTS.pending;
  return (
    <div className={`${styles.cell} ${styles[variant] ?? ''}`}>
      <IconBadge
        variant={variant}
        icon={<Img src={config.icon} />}
      />
      <span className={styles.label}>{config.label}</span>
    </div>
  );
}
