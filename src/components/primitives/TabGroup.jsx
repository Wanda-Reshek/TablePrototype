import { useState } from 'react';
import Tab from './Tab';
import styles from './TabGroup.module.css';

/**
 * TabGroup — a row of Tab buttons where exactly one is always selected.
 *
 * Props:
 *   tabs            Array<{ label: string, count?: number }>
 *   defaultSelected number   Index of initially selected tab (default: 0)
 *   onChange        function Called with (index, tab) when selection changes
 */
export default function TabGroup({ tabs = [], defaultSelected = 0, onChange }) {
  const [selected, setSelected] = useState(defaultSelected);

  function handleSelect(index) {
    setSelected(index);
    onChange?.(index, tabs[index]);
  }

  return (
    <div className={styles.group} role="tablist">
      {tabs.map((tab, i) => (
        <Tab
          key={tab.label}
          label={tab.label}
          count={tab.count}
          selected={i === selected}
          onClick={() => handleSelect(i)}
        />
      ))}
    </div>
  );
}
