import DropdownMenu from './DropdownMenu';
import attachmentsIcon from '../../Icons/Attachments.svg';
import downloadIcon from '../../Icons/Download.svg';
import duplicateIcon from '../../Icons/Duplicate.svg';
import deleteIcon from '../../Icons/Delete.svg';

const Img = ({ src, alt = '' }) => (
  <img src={src} width={20} height={20} alt={alt} aria-hidden="true" />
);

const defaultItems = [
  { label: 'Attachments', icon: <Img src={attachmentsIcon} /> },
  { label: 'Download',    icon: <Img src={downloadIcon} /> },
  { label: 'Duplicate',   icon: <Img src={duplicateIcon} /> },
  { label: 'Delete',      icon: <Img src={deleteIcon} />, danger: true, divider: true },
];

export default {
  title: 'Primitives/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    backgrounds: {
      default: 'page',
      values: [{ name: 'page', value: '#FAFAF8' }],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '40px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  name: 'Default — Figma spec',
  args: {
    items: defaultItems,
  },
};

export const WithoutIcons = {
  args: {
    items: [
      { label: 'Rename' },
      { label: 'Duplicate' },
      { label: 'Archive', divider: true },
      { label: 'Delete', danger: true },
    ],
  },
};
