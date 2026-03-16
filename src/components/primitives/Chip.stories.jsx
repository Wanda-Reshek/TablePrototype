import Chip from './Chip';
import attachmentsIcon from '../../Icons/Attachments.svg';

const AttachIcon = () => (
  <img src={attachmentsIcon} width={14} height={14} alt="" aria-hidden="true" />
);

export default {
  title: 'Primitives/Chip',
  component: Chip,
  parameters: {
    backgrounds: {
      default: 'page',
      values: [{ name: 'page', value: '#FAFAF8' }],
    },
    layout: 'centered',
  },
};

export const Default = {
  name: 'Attachments chip — Figma spec',
  args: {
    icon: <AttachIcon />,
    children: '1',
  },
};

export const MultipleAttachments = {
  name: 'Multiple attachments',
  args: {
    icon: <AttachIcon />,
    children: '5',
  },
};

export const NoIcon = {
  name: 'No icon',
  args: {
    children: '3',
  },
};
