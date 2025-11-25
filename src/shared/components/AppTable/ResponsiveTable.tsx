import { Table, TableProps } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { cn } from '@/utils/helpers/cn.helper';

interface ResponsiveTableProps extends PropsWithChildren, TableProps {
  minWidth?: number | string;
  containerClassName?: string;
}

export const ResponsiveTable = ({
  children,
  minWidth = 640,
  containerClassName,
  className,
  style,
  ...props
}: ResponsiveTableProps) => {
  const resolvedMinWidth = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;

  return (
    <div className={cn('thin-scrollbar w-full overflow-x-auto', containerClassName)}>
      <Table
        {...props}
        className={className}
        style={{
          minWidth: resolvedMinWidth,
          ...style,
        }}>
        {children}
      </Table>
    </div>
  );
};
