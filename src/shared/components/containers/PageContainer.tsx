import { cn } from '@/utils/helpers/cn.helper';
import { PropsWithChildren } from 'react';

interface PageContainerProps extends PropsWithChildren {
  className?: string;
}

const PageContainer = ({ children, className }: PageContainerProps) => {
  return <section className={cn('mx-auto flex w-full max-w-5xl flex-col gap-6', className)}>{children}</section>;
};

export default PageContainer;
