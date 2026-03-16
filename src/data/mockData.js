/**
 * Mock dataset — sample rows for the data table prototype.
 * Each row represents a fictional transaction/record.
 * Extend or replace this data as needed.
 */

const STATUSES = ['Active', 'Pending', 'Completed', 'Failed', 'Cancelled'];
const CATEGORIES = ['Finance', 'Operations', 'Marketing', 'Engineering', 'Sales'];
const REGIONS = ['North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East'];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}

function generateRows(count = 50) {
  return Array.from({ length: count }, (_, i) => ({
    id: `TXN-${String(i + 1).padStart(4, '0')}`,
    name: `Record ${i + 1}`,
    status: randomFrom(STATUSES),
    category: randomFrom(CATEGORIES),
    region: randomFrom(REGIONS),
    amount: Math.round(Math.random() * 100000) / 100,
    date: randomDate(new Date('2025-01-01'), new Date('2026-03-15')),
    assignee: `User ${Math.floor(Math.random() * 12) + 1}`,
  }));
}

export const mockColumns = [
  { id: 'id', header: 'ID', accessorKey: 'id' },
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'status', header: 'Status', accessorKey: 'status' },
  { id: 'category', header: 'Category', accessorKey: 'category' },
  { id: 'region', header: 'Region', accessorKey: 'region' },
  { id: 'amount', header: 'Amount', accessorKey: 'amount' },
  { id: 'date', header: 'Date', accessorKey: 'date' },
  { id: 'assignee', header: 'Assignee', accessorKey: 'assignee' },
];

export const mockData = generateRows(50);
