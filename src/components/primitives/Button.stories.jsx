import Button from './Button';
import columnIcon from '../../Icons/column.svg';

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'brand'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  parameters: {
    backgrounds: {
      default: 'page',
      values: [{ name: 'page', value: '#FAFAF8' }],
    },
  },
};

export const Primary = {
  args: { children: 'Primary button', variant: 'primary' },
};

export const Secondary = {
  name: 'Secondary (Columns)',
  render: () => (
    <Button variant="secondary" icon={<img src={columnIcon} width={20} height={20} alt="" aria-hidden="true" />}>
      5/12
    </Button>
  ),
};

export const Ghost = {
  args: { children: 'Ghost button', variant: 'ghost' },
};

export const BrandCTA = {
  name: 'Brand CTA (hover for gradient)',
  render: () => (
    <Button variant="brand" icon={<PlusIcon />}>
      Create document
    </Button>
  ),
};

export const Danger = {
  args: { children: 'Delete', variant: 'danger' },
};

export const Small = {
  args: { children: 'Small', size: 'sm' },
};

export const Large = {
  args: { children: 'Large', size: 'lg' },
};

export const Disabled = {
  args: { children: 'Disabled', disabled: true },
};
