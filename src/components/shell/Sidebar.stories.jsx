import { useState } from 'react';
import Sidebar from './Sidebar';

export default {
  title: 'Shell/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'page',
      values: [
        { name: 'page', value: '#FAFAF8' },
        { name: 'nav',  value: '#F2F3EE' },
      ],
    },
  },
};

export const Pinned = {
  name: 'Pinned (expanded)',
  render: () => {
    const [pinned, setPinned] = useState(true);
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar pinned={pinned} onPin={() => setPinned(true)} onCollapse={() => setPinned(false)} />
      </div>
    );
  },
};

export const Collapsed = {
  name: 'Collapsed (icon-only + hover popover)',
  render: () => {
    const [pinned, setPinned] = useState(false);
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar pinned={pinned} onPin={() => setPinned(true)} onCollapse={() => setPinned(false)} />
      </div>
    );
  },
};

export const Interactive = {
  name: 'Interactive (pin / collapse)',
  render: () => {
    const [pinned, setPinned] = useState(true);
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-surface-app)' }}>
        <Sidebar pinned={pinned} onPin={() => setPinned(true)} onCollapse={() => setPinned(false)} />
        <div style={{ padding: '32px', flex: 1 }}>
          <p style={{
            fontFamily: 'var(--font-family-sans)',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-subtle)',
          }}>
            Click "Collapse sidebar" in the nav to collapse. Hover the strip to see the popover. Click "Pin sidebar" to pin it back.
          </p>
        </div>
      </div>
    );
  },
};
