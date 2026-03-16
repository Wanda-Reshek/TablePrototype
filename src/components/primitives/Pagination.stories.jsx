import { useState } from 'react';
import Pagination from './Pagination';

export default {
  title: 'Primitives/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
};

function Controlled(args) {
  const [page, setPage] = useState(args.page ?? 1);
  const [pageSize, setPageSize] = useState(args.pageSize ?? 50);
  return (
    <Pagination
      {...args}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
    />
  );
}

export const Default = {
  render: (args) => <Controlled {...args} />,
  args: {
    page: 1,
    pageSize: 50,
    total: 763,
    pageSizes: [25, 50, 100],
  },
};

export const MiddlePage = {
  render: (args) => <Controlled {...args} />,
  args: {
    page: 8,
    pageSize: 50,
    total: 763,
    pageSizes: [25, 50, 100],
  },
};

export const LastPage = {
  render: (args) => <Controlled {...args} />,
  args: {
    page: 16,
    pageSize: 50,
    total: 763,
    pageSizes: [25, 50, 100],
  },
};
