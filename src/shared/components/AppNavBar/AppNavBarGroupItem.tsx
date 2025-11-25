import { BulkIcon, CaretUpIcon } from '@/shared/icons';
import { cn } from '@/utils/helpers/cn.helper';
import { SideBarGroupItemType } from '@/utils/types/common.type';
import { rem, Stack, Transition } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react';
import { Link } from 'react-router';
import { twMerge } from 'tailwind-merge';

interface AppNavBarGroupItemProps extends SideBarGroupItemType {
  navBarExpanded: boolean;
  selectedPath: [string | undefined, string | undefined];
  onNavigate?: () => void;
}

export const AppNavBarGroupItem = ({
  title,
  Icon,
  items,
  groupPath,
  navBarExpanded,
  selectedPath,
  onNavigate,
}: AppNavBarGroupItemProps) => {
  const [opended, { close, toggle: toggleOpened }] = useDisclosure(false);

  useEffect(() => {
    if (!navBarExpanded) {
      close();
    }
  }, [close, navBarExpanded]);

  return (
    <>
      <div
        className={twMerge(
          'transition-padding hover:bg-grey-5 flex h-10 items-center gap-3 rounded-lg py-2 text-sm duration-300 ease-in-out dark:hover:bg-zinc-700',
          navBarExpanded ? 'mr-2 px-4' : 'px-4',
          selectedPath[0] === groupPath ? 'bg-primary-6 hover:bg-primary-2 text-white' : 'text-grey-8',
        )}
        onClick={toggleOpened}>
        <Icon className='size-6 shrink-0' fill={selectedPath[0] === groupPath ? 'white' : 'var(--color-grey-8)'} />

        <span
          className={twMerge(
            'flex flex-1 cursor-default items-center justify-between transition-opacity duration-250',
            navBarExpanded ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}>
          {title}
        </span>
        <CaretUpIcon
          width={16}
          height={16}
          fill={selectedPath[0] === groupPath ? 'var(--color-primary-7)' : 'var(--color-grey-8)'}
          className={cn('transition-all', opended && 'rotate-180')}
        />
      </div>

      <Transition mounted={opended} transition='scale-y' duration={200}>
        {(styles) => (
          <Stack gap={rem(8)} mt={rem(4)} style={styles} hidden={!navBarExpanded}>
            {items.map((item, index) => (
              <Link
                to={item.href}
                onClick={onNavigate}
                key={index}
                className={twMerge(
                  'hover:bg-primary-1 flex h-10 gap-3 rounded-sm py-2 pl-10 text-sm',
                  item.href.split('/')[2] === selectedPath[1] ? 'text-primary-7 bg-primary-2 hover:bg-primary-2' : 'text-grey-8',
                )}>
                <BulkIcon />
                {item.title}
              </Link>
            ))}
          </Stack>
        )}
      </Transition>
    </>
  );
};
