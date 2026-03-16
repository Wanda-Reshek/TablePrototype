import Tooltip from './Tooltip';

export default {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    children: { control: 'text' },
  },
  parameters: {
    backgrounds: {
      default: 'page',
      values: [{ name: 'page', value: '#FAFAF8' }],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const Top = {
  name: 'Top (arrow below) — Figma spec',
  args: {
    placement: 'top',
    children: "Request Owner's confirmation",
  },
};

export const Bottom = {
  args: {
    placement: 'bottom',
    children: "Request Owner's confirmation",
  },
};

export const Left = {
  args: {
    placement: 'left',
    children: 'Edit columns',
  },
};

export const Right = {
  args: {
    placement: 'right',
    children: 'Edit columns',
  },
};

export const LongText = {
  name: 'Long text (max 240px)',
  args: {
    placement: 'top',
    children: 'This tooltip contains a longer description that will wrap across multiple lines within the 240px maximum width constraint.',
  },
};

export const Interactive = {
  name: 'Interactive — hover trigger',
  render: () => {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* In a real app, show/hide logic would live here */}
        <div style={{ marginBottom: 8 }}>
          <Tooltip placement="top">Request Owner&rsquo;s confirmation</Tooltip>
        </div>
        <button
          type="button"
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid rgba(104,105,91,0.2)',
            background: '#fff',
            cursor: 'pointer',
            fontFamily: 'var(--font-family-sans)',
            fontSize: 14,
          }}
        >
          Hover trigger (static demo)
        </button>
      </div>
    );
  },
};
