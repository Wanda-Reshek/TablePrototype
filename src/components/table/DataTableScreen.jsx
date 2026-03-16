import { mockData, mockColumns } from '../../data/mockData';
import Button from '../primitives/Button';
import styles from './DataTableScreen.module.css';

export default function DataTableScreen() {
  return (
    <div className={styles.screen}>
      {/* Toolbar — filters, search, and actions will go here */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <Button variant="secondary" size="sm">Filter</Button>
          <Button variant="secondary" size="sm">Sort</Button>
        </div>
        <div className={styles.toolbarGroup}>
          <Button variant="ghost" size="sm">Customize Columns</Button>
          <Button variant="primary" size="sm">Export</Button>
        </div>
      </div>

      {/* Table placeholder — TanStack Table will be wired in here */}
      <div className={styles.placeholder}>
        <span className={styles.placeholderIcon}>📋</span>
        <span className={styles.placeholderTitle}>Data Table</span>
        <span className={styles.placeholderHint}>
          {mockData.length} rows · {mockColumns.length} columns — ready for TanStack Table
        </span>
      </div>
    </div>
  );
}
