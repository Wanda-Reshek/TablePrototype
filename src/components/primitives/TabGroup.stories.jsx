import TabGroup from './TabGroup';
import Tab from './Tab';

export default {
  title: 'Primitives/Tabs',
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'page',
      values: [{ name: 'page', value: '#FAFAF8' }],
    },
  },
};

// ── Single Tab ────────────────────────────────────────────────────────────────

export const SingleTabUnselected = {
  name: 'Tab / Unselected',
  render: () => <Tab label="Drafts" />,
};

export const SingleTabSelected = {
  name: 'Tab / Selected',
  render: () => <Tab label="Drafts" selected />,
};

export const SingleTabWithCounter = {
  name: 'Tab / With counter',
  render: () => <Tab label="Needs approval" count={15} />,
};

export const SingleTabSelectedWithCounter = {
  name: 'Tab / Selected with counter',
  render: () => <Tab label="Needs approval" count={15} selected />,
};

// ── TabGroup ──────────────────────────────────────────────────────────────────

export const FromFigma = {
  name: 'TabGroup / Figma spec',
  render: () => (
    <TabGroup
      tabs={[
        { label: 'Drafts' },
        { label: 'Needs approval', count: 15 },
        { label: 'Vault', count: 2 },
        { label: 'Archive' },
      ]}
      defaultSelected={0}
    />
  ),
};

export const Interactive = {
  name: 'TabGroup / Interactive',
  render: () => (
    <TabGroup
      tabs={[
        { label: 'Drafts' },
        { label: 'Needs approval', count: 15 },
        { label: 'Vault', count: 2 },
        { label: 'Archive' },
      ]}
      defaultSelected={0}
      onChange={(i, tab) => console.log('selected:', tab.label)}
    />
  ),
};
