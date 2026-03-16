import { useState } from 'react';
import SidebarSection from './SidebarSection';
import SidebarEntry from './SidebarEntry';
import NavItem from './NavItem';
import {
  CommercialContractsIcon,
  IntegrationsIcon,
  TransportDocumentsIcon,
  RiskManagementIcon,
  InventoryFinanceIcon,
  ClausesLibraryIcon,
  CustomsNotificationsIcon,
  InviteToSecroIcon,
  SupportIcon,
  CollapseSidebarIcon,
  ExpandSidebarIcon,
} from '../../Icons/SidebarIcons';

// Sub-items for accordions
const TRANSPORT_ITEMS = [
  'BIMCO eBL Congenbill',
  'ASBA Nograin BL 1989 UK',
  'Private Documents',
  "Private Mate's Receipt",
];

const INTEGRATIONS_ITEMS = [
  'API Connections',
  'Webhooks',
  'Third-party Apps',
];

export default {
  title: 'Navigation/SidebarSection',
  component: SidebarSection,
  parameters: {
    backgrounds: {
      default: 'nav',
      values: [
        { name: 'nav',  value: '#F2F3EE' },
        { name: 'page', value: '#FAFAF8' },
      ],
    },
    layout: 'padded',
  },
};

// ── Section 1 – Main nav ───────────────────────────────────────────────────

export const MainNavSection = {
  name: 'Section 1 · Main nav',
  render: () => (
    <div style={{ width: '240px' }}>
      <SidebarSection>
        <SidebarEntry icon={<CommercialContractsIcon />} label="Commercial Contracts" />
        <SidebarEntry icon={<IntegrationsIcon />} label="Integrations">
          {INTEGRATIONS_ITEMS.map((l) => <NavItem key={l} label={l} />)}
        </SidebarEntry>
        <SidebarEntry icon={<TransportDocumentsIcon />} label="Transport Documents" active defaultExpanded>
          {TRANSPORT_ITEMS.map((l) => (
            <NavItem key={l} label={l} selected={l === 'ASBA Nograin BL 1989 UK'} />
          ))}
        </SidebarEntry>
        <SidebarEntry icon={<RiskManagementIcon />} label="Risk Management" />
        <SidebarEntry icon={<InventoryFinanceIcon />} label="Inventory Finance" />
        <SidebarEntry icon={<ClausesLibraryIcon />} label="Clauses Library" />
        <SidebarEntry icon={<CustomsNotificationsIcon />} label="Customs Notifications" />
      </SidebarSection>
    </div>
  ),
};

// ── Section 2 – Utility ────────────────────────────────────────────────────

export const UtilitySection = {
  name: 'Section 2 · Utility (Invite + Support)',
  render: () => (
    <div style={{ width: '240px' }}>
      <SidebarSection>
        <SidebarEntry icon={<InviteToSecroIcon />} label="Invite to Secro" onClick={() => {}} />
        <SidebarEntry icon={<SupportIcon />} label="Support" onClick={() => {}} />
      </SidebarSection>
    </div>
  ),
};

// ── Section 3 – Controls ───────────────────────────────────────────────────

export const ControlsSection = {
  name: 'Section 3 · Collapse / Expand',
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ width: collapsed ? '56px' : '240px', transition: 'width 300ms ease' }}>
        <SidebarSection>
          <SidebarEntry
            icon={collapsed ? <ExpandSidebarIcon /> : <CollapseSidebarIcon />}
            label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            sidebarCollapsed={collapsed}
            onClick={() => setCollapsed((c) => !c)}
          />
        </SidebarSection>
      </div>
    );
  },
};

// ── Full sidebar (all 3 sections composed) ────────────────────────────────

export const FullSidebar = {
  name: 'Full sidebar · all 3 sections',
  render: () => {
    const [selected, setSelected] = useState('ASBA Nograin BL 1989 UK');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const isTransportActive = TRANSPORT_ITEMS.includes(selected);
    const isIntegrationsActive = INTEGRATIONS_ITEMS.includes(selected);

    return (
      <div style={{
        width: sidebarCollapsed ? '56px' : '240px',
        minHeight: '600px',
        background: 'var(--color-nav-bg)',
        padding: 'var(--nav-inner-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        borderRadius: '12px',
        transition: 'width var(--duration-slow) var(--easing-default)',
        overflow: 'hidden',
      }}>

        {/* ── Section 1: Main navigation ── */}
        <SidebarSection grow>
          <SidebarEntry
            icon={<CommercialContractsIcon />}
            label="Commercial Contracts"
            active={selected === 'commercial-contracts'}
            sidebarCollapsed={sidebarCollapsed}
            onClick={() => setSelected('commercial-contracts')}
          />
          <SidebarEntry
            icon={<IntegrationsIcon />}
            label="Integrations"
            active={isIntegrationsActive}
            defaultExpanded={isIntegrationsActive}
            sidebarCollapsed={sidebarCollapsed}
          >
            {INTEGRATIONS_ITEMS.map((l) => (
              <NavItem key={l} label={l} selected={selected === l} onClick={() => setSelected(l)} />
            ))}
          </SidebarEntry>
          <SidebarEntry
            icon={<TransportDocumentsIcon />}
            label="Transport Documents"
            active={isTransportActive}
            defaultExpanded={isTransportActive}
            sidebarCollapsed={sidebarCollapsed}
          >
            {TRANSPORT_ITEMS.map((l) => (
              <NavItem key={l} label={l} selected={selected === l} onClick={() => setSelected(l)} />
            ))}
          </SidebarEntry>
          <SidebarEntry
            icon={<RiskManagementIcon />}
            label="Risk Management"
            active={selected === 'risk-management'}
            sidebarCollapsed={sidebarCollapsed}
            onClick={() => setSelected('risk-management')}
          />
          <SidebarEntry
            icon={<InventoryFinanceIcon />}
            label="Inventory Finance"
            active={selected === 'inventory-finance'}
            sidebarCollapsed={sidebarCollapsed}
            onClick={() => setSelected('inventory-finance')}
          />
          <SidebarEntry
            icon={<ClausesLibraryIcon />}
            label="Clauses Library"
            active={selected === 'clauses-library'}
            sidebarCollapsed={sidebarCollapsed}
            onClick={() => setSelected('clauses-library')}
          />
          <SidebarEntry
            icon={<CustomsNotificationsIcon />}
            label="Customs Notifications"
            active={selected === 'customs-notifications'}
            sidebarCollapsed={sidebarCollapsed}
            onClick={() => setSelected('customs-notifications')}
          />
        </SidebarSection>

        {/* ── Section 2: Utility ── */}
        <SidebarSection>
          <SidebarEntry
            icon={<InviteToSecroIcon />}
            label="Invite to Secro"
            sidebarCollapsed={sidebarCollapsed}
            onClick={() => {}}
          />
          <SidebarEntry
            icon={<SupportIcon />}
            label="Support"
            sidebarCollapsed={sidebarCollapsed}
            onClick={() => {}}
          />
        </SidebarSection>

        {/* ── Section 3: Collapse toggle ── */}
        <SidebarSection>
          <SidebarEntry
            icon={sidebarCollapsed ? <ExpandSidebarIcon /> : <CollapseSidebarIcon />}
            label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            sidebarCollapsed={sidebarCollapsed}
            onClick={() => setSidebarCollapsed((c) => !c)}
          />
        </SidebarSection>

      </div>
    );
  },
};
