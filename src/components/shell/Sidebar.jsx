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

const TRANSPORT_ITEMS = [
  'BIMCO eBL Congenbill',
  'ASBA Nograin BL 1989 UK',
  'Private Documents',
  "Private Mate's Receipt",
];

const RISK_ITEMS = [
  'LOI no BL at POD',
  'E-Letter of Authority',
];

const INVENTORY_ITEMS = [
  'LME eWarrant',
  'Warehouse Receipt',
];

function SwitchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/** Shared nav content — used in both the collapsed strip and the expanded panel */
function NavContent({ sidebarCollapsed, pinned, onPin, onCollapse }) {
  return (
    <>
      <div className={styles.body}>
        <SidebarSection grow>
          <SidebarEntry icon={<CommercialContractsIcon />} label="Commercial Contracts" sidebarCollapsed={sidebarCollapsed}>
            <NavItem label="Contract e-signature" />
          </SidebarEntry>
          <SidebarEntry icon={<IntegrationsIcon />} label="Integrations" sidebarCollapsed={sidebarCollapsed}>
            <NavItem label="Bookings" />
          </SidebarEntry>
          <SidebarEntry icon={<TransportDocumentsIcon />} label="Transport Documents" sidebarCollapsed={sidebarCollapsed}>
            {TRANSPORT_ITEMS.map((l) => <NavItem key={l} label={l} />)}
          </SidebarEntry>
          <SidebarEntry icon={<RiskManagementIcon />} label="Risk Management" sidebarCollapsed={sidebarCollapsed}>
            {RISK_ITEMS.map((l) => <NavItem key={l} label={l} />)}
          </SidebarEntry>
          <SidebarEntry icon={<InventoryFinanceIcon />} label="Inventory Finance" sidebarCollapsed={sidebarCollapsed}>
            {INVENTORY_ITEMS.map((l) => <NavItem key={l} label={l} />)}
          </SidebarEntry>
          <SidebarEntry icon={<ClausesLibraryIcon />} label="Clauses Library" sidebarCollapsed={sidebarCollapsed} />
          <SidebarEntry icon={<CustomsNotificationsIcon />} label="Customs Notifications" sidebarCollapsed={sidebarCollapsed} />
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

export default function Sidebar({ pinned, onPin, onCollapse, orgName = 'North Chemicals' }) {
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
          <img src={logoCollapsed} alt="Secro" className={styles.logoImg} draggable={false} />
        </div>
        <NavContent sidebarCollapsed={true} pinned={pinned} onPin={onPin} onCollapse={onCollapse} />
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
          <img src={logoCollapsed} alt="Secro" className={styles.logoImg} draggable={false} />
          <button className={styles.orgRow} type="button">
            <span className={styles.orgName}>{orgName}</span>
            <SwitchIcon />
          </button>
        </div>
        <NavContent sidebarCollapsed={false} pinned={pinned} onPin={onPin} onCollapse={onCollapse} />
      </aside>
    </div>
  );
}
