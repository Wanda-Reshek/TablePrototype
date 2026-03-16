import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import styles from './AppShell.module.css';

export default function AppShell({ title, children }) {
  // pinned: sidebar is expanded and takes layout space
  // !pinned: sidebar is collapsed (narrow) — hover popover handled inside Sidebar
  const [pinned, setPinned] = useState(true);

  return (
    <div className={`${styles.shell} ${pinned ? styles.sidebarPinned : ''}`}>
      <Sidebar pinned={pinned} onPin={() => setPinned(true)} onCollapse={() => setPinned(false)} />
      <div className={styles.main}>
        <TopBar title={title} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
