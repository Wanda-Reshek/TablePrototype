import IconButton from './IconButton';
import ownersConfirmationIcon from '../../Icons/Owners-Confirmation.svg';

const Icon = () => (
  <img src={ownersConfirmationIcon} width={20} height={20} alt="" aria-hidden="true" />
);

export default {
  title: 'Primitives/IconButton',
  component: IconButton,
  parameters: {
    backgrounds: {
      default: 'page',
      values: [{ name: 'page', value: '#FAFAF8' }],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  name: "Owner's Confirmation",
  args: {
    icon: <Icon />,
    label: "Request Owner's confirmation",
  },
};

export const Disabled = {
  args: {
    icon: <Icon />,
    label: "Request Owner's confirmation",
    disabled: true,
  },
};
