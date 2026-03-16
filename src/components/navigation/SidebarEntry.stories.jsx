import { useState } from 'react';
import SidebarEntry from './SidebarEntry';
import NavItem from './NavItem';

// Placeholder icon matching the visual reference style (line icon)
const DocIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ContractIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ITEMS = [
  'BIMCO eBL Congenbill',
  'ASBA Nograin BL 1989 UK',
  'Private Documents',
  "Private Mate's Receipt",
];

export default {
  title: 'Navigation/SidebarEntry',
  component: SidebarEntry,
  parameters: {
    backgrounds: {
      default: 'nav',
      values: [
        { name: 'nav',  value: '#F2F3EE' },
        { name: 'page', value: '#FAFAF8' },
      ],
    },
  },
};

// ── Single states ──────────────────────────────────────────────────────────

export const InactiveCollapsed = {
  name: 'Inactive · collapsed',
  render: () => (
    <div style={{ width: '240px', display: 'flex', flexDirection: 'column' }}>
      <SidebarEntry icon={<DocIcon />} label="Transport Documents">
        {ITEMS.map((l) => <NavItem key={l} label={l} />)}
      </SidebarEntry>
    </div>
  ),
};

export const InactiveExpanded = {
  name: 'Inactive · expanded',
  render: () => (
    <div style={{ width: '240px', display: 'flex', flexDirection: 'column' }}>
      <SidebarEntry icon={<DocIcon />} label="Transport Documents" defaultExpanded>
        {ITEMS.map((l) => <NavItem key={l} label={l} />)}
      </SidebarEntry>
    </div>
  ),
};

export const ActiveExpanded = {
  name: 'Active · expanded (child page selected)',
  render: () => (
    <div style={{ width: '240px', display: 'flex', flexDirection: 'column' }}>
      <SidebarEntry icon={<DocIcon />} label="Transport Documents" active defaultExpanded>
        {ITEMS.map((l) => (
          <NavItem
            key={l}
            label={l}
            selected={l === 'ASBA Nograin BL 1989 UK'}
          />
        ))}
      </SidebarEntry>
    </div>
  ),
};

export const SidebarCollapsedInactive = {
  name: 'Sidebar collapsed · inactive',
  render: () => (
    <div style={{ width: '56px', display: 'flex', flexDirection: 'column', gap: 0 }}>
      <SidebarEntry icon={<DocIcon />} label="Transport Documents" sidebarCollapsed />
    </div>
  ),
};

export const SidebarCollapsedActive = {
  name: 'Sidebar collapsed · active',
  render: () => (
    <div style={{ width: '56px', display: 'flex', flexDirection: 'column' }}>
      <SidebarEntry icon={<DocIcon />} label="Transport Documents" active sidebarCollapsed />
    </div>
  ),
};

// ── Full sidebar simulation ────────────────────────────────────────────────

export const FullSidebarSimulation = {
  name: 'Full sidebar simulation',
  render: () => {
    const [selected, setSelected] = useState('ASBA Nograin BL 1989 UK');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const isTransportActive = ITEMS.includes(selected);

    return (
      <div style={{
        width: sidebarCollapsed ? '56px' : '240px',
        background: 'var(--color-nav-bg)',
        padding: 'var(--nav-inner-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        borderRadius: '12px',
        transition: 'width var(--duration-slow) var(--easing-default)',
        overflow: 'hidden',
      }}>
        <SidebarEntry
          icon={<ContractIcon />}
          label="Commercial Contracts"
          sidebarCollapsed={sidebarCollapsed}
        />
        <SidebarEntry
          icon={<DocIcon />}
          label="Transport Documents"
          active={isTransportActive}
          defaultExpanded={isTransportActive}
          sidebarCollapsed={sidebarCollapsed}
        >
          {ITEMS.map((l) => (
            <NavItem
              key={l}
              label={l}
              selected={selected === l}
              onClick={() => setSelected(l)}
            />
          ))}
        </SidebarEntry>
        <SidebarEntry
          icon={<ContractIcon />}
          label="Risk Management"
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed((c) => !c)}
          style={{
            marginTop: '16px',
            padding: '8px',
            background: 'transparent',
            border: '1px dashed var(--color-nav-border)',
            borderRadius: 'var(--nav-item-radius)',
            color: 'var(--color-nav-item-text)',
            fontSize: 'var(--nav-font-size)',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-sans)',
          }}
        >
          {sidebarCollapsed ? '→' : '← Collapse'}
        </button>
      </div>
    );
  },
};
