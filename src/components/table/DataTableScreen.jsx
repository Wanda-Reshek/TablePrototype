import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { mockData, mockColumns } from '../../data/mockData';
import Button from '../primitives/Button';
import ColumnHeaderMenu from './ColumnHeaderMenu';
import ColumnHeader from './ColumnHeader';
import styles from './DataTableScreen.module.css';

export default function DataTableScreen({ showToolbar = true, paginationState, onPaginationChange }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [internalPagination, setInternalPagination] = useState({ pageIndex: 0, pageSize: 50 });
  const pagination = paginationState ?? internalPagination;
  const setPagination = onPaginationChange ?? setInternalPagination;
  const [columnSizing, setColumnSizing] = useState({});
  const [openMenu, setOpenMenu] = useState(null); // { columnId, anchorEl }

  const table = useReactTable({
    data: mockData,
    columns: mockColumns,
    state: { sorting, columnFilters, pagination, columnSizing },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={styles.screen}>
      {/* Toolbar */}
      {showToolbar && (
        <div className={styles.toolbar}>
          <div className={styles.toolbarGroup}>
            <Button variant="secondary">Filter</Button>
            <Button variant="secondary">Sort</Button>
          </div>
          <div className={styles.toolbarGroup}>
            <Button variant="ghost">Customize Columns</Button>
            <Button variant="primary">Export</Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table} style={{ width: table.getTotalSize() }}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isActions = header.column.id === '_actions';
                  const isSpacer  = header.column.id === '_spacer';
                  return (
                    <th
                      key={header.id}
                      className={isActions ? styles.thActions : isSpacer ? styles.thSpacer : styles.th}
                      style={(isActions || isSpacer) ? { width: header.getSize() } : { width: header.getSize() }}
                    >
                      {!isActions && !isSpacer && (
                        <>
                          <ColumnHeader
                            label={flexRender(header.column.columnDef.header, header.getContext())}
                            sorted={header.column.getIsSorted()}
                            filtered={!!header.column.getFilterValue()}
                            active={openMenu?.columnId === header.id}
                            onClick={(_, th) => setOpenMenu(
                              openMenu?.columnId === header.id
                                ? null
                                : { columnId: header.id, anchorEl: th }
                            )}
                          />
                          <div
                            className={`${styles.resizeHandle} ${header.column.getIsResizing() ? styles.resizeHandleActive : ''}`}
                            onMouseDown={(e) => { e.stopPropagation(); header.getResizeHandler()(e); }}
                            onTouchStart={(e) => { e.stopPropagation(); header.getResizeHandler()(e); }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={styles.tr}>
                {row.getVisibleCells().map((cell) => {
                  const isActions = cell.column.id === '_actions';
                  const isSpacer  = cell.column.id === '_spacer';
                  return (
                    <td
                      key={cell.id}
                      className={isActions ? styles.tdActions : isSpacer ? styles.tdSpacer : styles.td}
                      style={{ width: cell.column.getSize() }}
                    >
                      {isActions && (
                        <div className={styles.actionsOverlay}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      )}
                      {!isActions && !isSpacer && flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Column header menu — portalled to body to escape overflow clip */}
      {openMenu && (
        <ColumnHeaderMenu
          column={table.getColumn(openMenu.columnId)}
          anchorEl={openMenu.anchorEl}
          onClose={() => setOpenMenu(null)}
        />
      )}

    </div>
  );
}
