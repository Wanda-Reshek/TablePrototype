import { useState } from 'react';
import NavItem from './NavItem';

export default {
  title: 'Navigation/NavItem',
  component: NavItem,
  parameters: {
    // Render inside a panel that matches the sidebar background
    backgrounds: {
      default: 'nav',
      values: [
        { name: 'nav',  value: '#F2F3EE' },
        { name: 'page', value: '#FAFAF8' },
      ],
    },
  },
  argTypes: {
    label:    { control: 'text' },
    selected: { control: 'boolean' },
    onClick:  { action: 'clicked' },
  },
};

// ── Single states ──────────────────────────────────────────────────────────

export const Resting = {
  args: { label: 'BIMCO eBL Congenbill', selected: false },
};

export const Selected = {
  args: { label: 'BIMCO eBL Congenbill', selected: true },
};

export const LongLabel = {
  args: {
    label: 'Very Long Document Name That Gets Truncated',
    selected: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '240px' }}>
        <Story />
      </div>
    ),
  ],
};

// ── Interactive list — shows all states together ───────────────────────────

const ITEMS = [
  'BIMCO eBL Congenbill',
  'ASBA Nograin BL 1989 UK',
  'Private Documents',
  'Private Mate\'s Receipt',
];

export const InteractiveList = {
  name: 'Interactive list',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState('BIMCO eBL Congenbill');
    return (
      <div
        style={{
          width: '240px',
          background: 'var(--color-nav-item-active-bg)', // simulates an active category bg
          borderRadius: 'var(--nav-item-radius)',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {ITEMS.map((label) => (
          <NavItem
            key={label}
            label={label}
            selected={selected === label}
            onClick={() => setSelected(label)}
          />
        ))}
      </div>
    );
  },
};
