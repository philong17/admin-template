import { cn } from '@/utils/helpers/cn.helper';
import { PropsWithChildren } from 'react';

interface PageContainerProps extends PropsWithChildren {
  className?: string;
}

const MainContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className={cn('bg-grey-3 relative flex min-h-screen flex-1 flex-col gap-6 px-4 py-5 sm:px-6 lg:px-10', className)}>
      {children}
    </div>
  );
};

export default MainContainer;
