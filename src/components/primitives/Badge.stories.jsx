import Badge from './Badge';

export default {
  title: 'Primitives/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['drafted', 'final-draft', 'drafting', 'pending-issuing'],
    },
    label: { control: 'text' },
  },
  parameters: {
    backgrounds: {
      default: 'page',
      values: [{ name: 'page', value: '#FAFAF8' }],
    },
    layout: 'centered',
  },
};

export const Drafted = {
  args: { variant: 'drafted' },
};

export const FinalDraft = {
  name: 'Final draft',
  args: { variant: 'final-draft' },
};

export const Drafting = {
  args: { variant: 'drafting' },
};

export const PendingIssuing = {
  name: 'Pending issuing',
  args: { variant: 'pending-issuing' },
};

export const AllVariants = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Badge variant="drafted" />
      <Badge variant="final-draft" />
      <Badge variant="drafting" />
      <Badge variant="pending-issuing" />
    </div>
  ),
};
