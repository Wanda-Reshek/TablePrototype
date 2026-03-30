import { useState } from 'react';
import logoCollapsed from '../../logo/logo-collapsed.png';
import styles from './Sidebar.module.css';
import SidebarSection from '../navigation/SidebarSection';
import SidebarEntry from '../navigation/SidebarEntry';
import NavItem from '../navigation/NavItem';
import {
  CommercialContractsIcon,
  IntegrationsIcon,
  TransportDocumentsIcon,
  RiskManagementIcon,
  InventoryFinanceIcon,
  ClausesLibraryIcon,
  CustomsNotificationsIcon,
  CollapseSidebarIcon,
  ExpandSidebarIcon,
} from '../../Icons/SidebarIcons';

const TRADE_ITEMS = [
  'Trade Confirmations',
  'Execution Reports',
  'Settlement Instructions',
  'Allocation Notices',
];

// Static counts shown next to specific nav items
const NAV_COUNTS = {
  'Trade Confirmations': 28,
  'Execution Reports': 15,
};

const COMPLIANCE_ITEMS = [
  'Regulatory Reports',
  'Trade Blotter',
];

const AGREEMENTS_ITEMS = [
  'ISDA Agreements',
  'Counterparty Terms',
];

function SwitchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Shared nav content — used in both the collapsed strip and the expanded panel */
function NavContent({ sidebarCollapsed, pinned, onPin, onCollapse, activeNavItem }) {
  const tradeActive = TRADE_ITEMS.includes(activeNavItem);
  return (
    <>
      <div className={styles.body}>
        <SidebarSection grow>
          <SidebarEntry icon={<CommercialContractsIcon />} label="Dashboard" sidebarCollapsed={sidebarCollapsed}>
            <NavItem label="Trading Overview" />
          </SidebarEntry>
          <SidebarEntry icon={<IntegrationsIcon />} label="Order Management" sidebarCollapsed={sidebarCollapsed}>
            <NavItem label="Active Orders" />
          </SidebarEntry>
          <SidebarEntry icon={<TransportDocumentsIcon />} label="Trade Documents"
            active={tradeActive}
            defaultExpanded={tradeActive}
            sidebarCollapsed={sidebarCollapsed}>
            {TRADE_ITEMS.map((l) => (
              <NavItem key={l} label={l} selected={l === activeNavItem} count={NAV_COUNTS[l]} />
            ))}
          </SidebarEntry>
          <SidebarEntry icon={<RiskManagementIcon />} label="Compliance" sidebarCollapsed={sidebarCollapsed}>
            {COMPLIANCE_ITEMS.map((l) => <NavItem key={l} label={l} />)}
          </SidebarEntry>
          <SidebarEntry icon={<InventoryFinanceIcon />} label="Agreements" sidebarCollapsed={sidebarCollapsed}>
            {AGREEMENTS_ITEMS.map((l) => <NavItem key={l} label={l} />)}
          </SidebarEntry>
          <SidebarEntry icon={<ClausesLibraryIcon />} label="Term Sheets" sidebarCollapsed={sidebarCollapsed} />
          <SidebarEntry icon={<CustomsNotificationsIcon />} label="Notifications" sidebarCollapsed={sidebarCollapsed} />
        </SidebarSection>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerDivider} />
        {pinned ? (
          <SidebarEntry
            icon={<CollapseSidebarIcon />}
            label="Collapse sidebar"
            sidebarCollapsed={false}
            onClick={onCollapse}
          />
        ) : (
          <SidebarEntry
            icon={<ExpandSidebarIcon />}
            label="Pin sidebar"
            sidebarCollapsed={sidebarCollapsed}
            onClick={onPin}
          />
        )}
      </div>
    </>
  );
}

export default function Sidebar({ pinned, onPin, onCollapse, orgName = 'Sterling Capital', activeNavItem }) {
  const [hovered, setHovered] = useState(false);
  const popoverVisible = !pinned && hovered;

  return (
    <div
      className={`${styles.sidebarWrapper} ${pinned ? styles.wrapperPinned : styles.wrapperCollapsed}`}
      onMouseEnter={() => !pinned && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Collapsed strip: always in layout flow, icons only ── */}
      <aside className={`${styles.sidebar} ${styles.collapsed}`}>
        <div className={`${styles.header} ${styles.headerCollapsed}`}>
          <img src={logoCollapsed} alt="" className={styles.logoImg} draggable={false} />
        </div>
        <NavContent sidebarCollapsed={true} pinned={pinned} onPin={onPin} onCollapse={onCollapse} activeNavItem={activeNavItem} />
      </aside>

      {/* ── Expanded panel: popover (floats) or pinned (part of layout) ── */}
      <aside
        className={[
          styles.sidebar,
          styles.panel,
          (pinned || popoverVisible) ? styles.panelVisible : '',
          pinned ? styles.panelPinned : styles.panelPopover,
        ].join(' ')}
        aria-hidden={!pinned && !popoverVisible}
      >
        <div className={styles.header}>
          <img src={logoCollapsed} alt="" className={styles.logoImg} draggable={false} />
          <button className={styles.orgRow} type="button">
            <span className={styles.orgName}>{orgName}</span>
            <SwitchIcon />
          </button>
        </div>
        <NavContent sidebarCollapsed={false} pinned={pinned} onPin={onPin} onCollapse={onCollapse} activeNavItem={activeNavItem} />
      </aside>
    </div>
  );
}
