import OrgUserCard from './OrgUserCard';

export default {
  title: 'Navigation/OrgUserCard',
  component: OrgUserCard,
  parameters: {
    backgrounds: {
      default: 'nav',
      values: [
        { name: 'nav',  value: '#F2F3EE' },
        { name: 'page', value: '#FAFAF8' },
      ],
    },
  },
  args: {
    orgName: 'North Chemicals',
    userName: 'Molly Petersen',
    initials: 'MP',
    avatarColor: '#7E57EF',
    onClick: () => {},
  },
};

export const Default = {};

export const LongNames = {
  name: 'Long names (truncation)',
  args: {
    orgName: 'Pacific North-West Shipping & Logistics Ltd.',
    userName: 'Bartholomew J. Okonkwo-Fitzgerald',
    initials: 'BF',
    avatarColor: '#2E7D32',
  },
};

export const SingleLetter = {
  name: 'Single-letter initial',
  args: {
    initials: 'A',
    orgName: 'Acme Corp',
    userName: 'Alice',
    avatarColor: '#1565C0',
  },
};
