import { Pagination, PaginationProps } from '@mantine/core';

interface AppPaginationProps extends PaginationProps {}

const AppPagination = (props: AppPaginationProps) => {
  return (
    <Pagination
      {...props}
      radius={8}
      classNames={{
        control:
          '!border-none !font-normal data-active:!text-primary-6 data-active:!border-solid data-active:!border-primary-6 !bg-transparent',
      }}
    />
  );
};

export default AppPagination;
