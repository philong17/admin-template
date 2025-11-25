import { SideBarItemType } from '@/utils/types/common.type';
import { useMemo } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface AppNavBarItemProps extends SideBarItemType {
  navBarExpanded: boolean;
  selectedPath: [string | undefined, string | undefined];
  onNavigate?: () => void;
}

export const AppNavBarItem = ({ title, href, Icon, navBarExpanded, selectedPath, onNavigate }: AppNavBarItemProps) => {
  const paths = useMemo(() => {
    return [href.split('/')[1], href.split('/')[2]];
  }, [href]);

  const isSelected = useMemo(() => {
    return selectedPath[0] === paths[0] && selectedPath[1] === paths[1];
  }, [selectedPath, paths]);

  return (
    <Link
      to={href}
      onClick={onNavigate}
      className={twMerge(
        'transition-padding hover:bg-grey-5 flex h-10 items-center gap-3 rounded-lg py-2 text-sm duration-300 ease-in-out dark:hover:bg-zinc-700',
        navBarExpanded ? 'mr-2 px-4' : 'px-4',
        isSelected ? 'bg-primary-6 hover:bg-primary-5 text-white' : 'text-grey-8',
      )}>
      <Icon className='size-6 shrink-0' fill={isSelected ? 'white' : 'var(--color-grey-8)'} />
      <span
        className={twMerge(
          'cursor-default transition-opacity duration-250',
          navBarExpanded ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}>
        {title}
      </span>
    </Link>
  );
};
