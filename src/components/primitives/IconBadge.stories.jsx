import IconBadge from './IconBadge';
import pendingIcon from '../../Icons/Pending.svg';
import approvalIcon from '../../Icons/Approval.svg';
import confirmedIcon from '../../Icons/Owners-Confirmation.svg';
import delegatedIcon from '../../Icons/Delegated.svg';

const Img = ({ src }) => (
  <img src={src} width={20} height={20} alt="" aria-hidden="true" />
);

export default {
  title: 'Primitives/IconBadge',
  component: IconBadge,
  parameters: {
    backgrounds: {
      default: 'page',
      values: [{ name: 'page', value: '#FAFAF8' }],
    },
    layout: 'centered',
  },
};

export const Pending = {
  args: {
    variant: 'pending',
    icon: <Img src={pendingIcon} />,
  },
};

export const Confirmed = {
  name: "Confirmed (Owner's confirmation)",
  args: {
    variant: 'confirmed',
    icon: <Img src={confirmedIcon} />,
  },
};

export const Approved = {
  args: {
    variant: 'approved',
    icon: <Img src={approvalIcon} />,
  },
};

export const Delegated = {
  args: {
    variant: 'delegated',
    icon: <Img src={delegatedIcon} />,
  },
};

export const AllVariants = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <IconBadge variant="pending"   icon={<Img src={pendingIcon} />} />
      <IconBadge variant="confirmed" icon={<Img src={confirmedIcon} />} />
      <IconBadge variant="approved"  icon={<Img src={approvalIcon} />} />
      <IconBadge variant="delegated" icon={<Img src={delegatedIcon} />} />
    </div>
  ),
};
