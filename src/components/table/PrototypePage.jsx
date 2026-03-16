import { useState } from 'react';
import Sidebar from '../shell/Sidebar';
import DataTableScreen from './DataTableScreen';
import Button from '../primitives/Button';
import TabGroup from '../primitives/TabGroup';
import styles from './PrototypePage.module.css';
import columnIcon from '../../Icons/column.svg';
import helpIcon from '../../Icons/Sidebar_Icons/Help.svg';

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const TABS = [
  { label: 'Drafts' },
  { label: 'My approvals', count: 15 },
  { label: 'Vault',        count: 15 },
  { label: 'Archive' },
];

export default function PrototypePage() {
  const [pinned, setPinned] = useState(true);

  return (
    <div className={`${styles.shell} ${pinned ? styles.sidebarPinned : ''}`}>
      <Sidebar
        pinned={pinned}
        orgName="North Chemical"
        activeNavItem="BIMCO eBL Congenbill"
        onPin={() => setPinned(true)}
        onCollapse={() => setPinned(false)}
      />

      <div className={styles.main}>
        {/* ── Page header ── */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>BIMCO eBL Congenbill</h1>
          <div className={styles.headerActions}>
            <button className={styles.helpBtn} aria-label="Help">
              <img src={helpIcon} width={20} height={20} alt="" aria-hidden="true" />
            </button>
            <Button variant="brand" icon={<PlusIcon />}>
              Create document
            </Button>
          </div>
        </div>

        {/* ── Tabs + column picker ── */}
        <div className={styles.tabsBar}>
          <TabGroup tabs={TABS} />
          <button className={styles.columnsBtn}>
            <img src={columnIcon} width={20} height={20} alt="" aria-hidden="true" />
            <span>5/12</span>
          </button>
        </div>

        {/* ── Table ── */}
        <div className={styles.tableArea}>
          <DataTableScreen showToolbar={false} />
        </div>
      </div>
    </div>
  );
}
