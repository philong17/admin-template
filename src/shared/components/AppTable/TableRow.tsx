import { LoadingOverlay, Table } from '@mantine/core';
import { PropsWithChildren } from 'react';

interface TableRowProps extends PropsWithChildren {
  dataLength: number;
  headerLength: number;
  isLoading: boolean;
  emptyText?: string;
}

export const TableRow = ({ dataLength, headerLength, isLoading, emptyText = 'Không có dữ liệu!', children }: TableRowProps) => {
  if (isLoading) {
    return (
      <Table.Tr>
        <Table.Td colSpan={headerLength} className='relative h-[150px]'>
          <LoadingOverlay visible />
        </Table.Td>
      </Table.Tr>
    );
  }

  if (dataLength === 0) {
    return (
      <Table.Tr>
        <Table.Td colSpan={headerLength} className='relative h-[150px] text-center'>
          <span className='text-center text-lg font-medium text-gray-500'>{emptyText}</span>
        </Table.Td>
      </Table.Tr>
    );
  }

  return <>{children}</>;
};
