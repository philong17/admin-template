import { BellIcon, CaretRightIcon } from '@/shared/icons';
import { ActionIcon, Breadcrumbs, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
import UserMenu from './UserMenu';

interface AppHeaderProps {
  titleItems?: {
    title: string;
    href?: string;
  }[];
  pageTitle: string;
  rightSection?: ReactNode;
}

const AppHeader = ({ titleItems, rightSection, pageTitle }: AppHeaderProps) => {
  const navigate = useNavigate();
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure(false);

  const renderTitles = useMemo(() => {
    return titleItems?.map((item, index) => (
      <Link
        key={index}
        to={item.href ?? '#'}
        onClick={() => item.href === '-1' && navigate(-1)}
        className='text-dark-500 hover:text-primary-6 text-base/[22px] font-normal'>
        {item.title}
      </Link>
    ));
  }, [titleItems, navigate]);

  return (
    <>
      {/* Desktop Header */}
      <header className='hidden w-full flex-col gap-4 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-sm md:flex md:flex-row md:items-center md:justify-between'>
        <div className='space-y-2'>
          <h1 className='text-dark-500 text-2xl leading-tight font-semibold'>{pageTitle}</h1>
          {!!titleItems?.length && (
            <Breadcrumbs
              className='flex flex-wrap text-sm text-slate-500'
              separatorMargin={3}
              separator={<CaretRightIcon fill='var(--color-zinc-800)' className='size-4' />}>
              {renderTitles}
            </Breadcrumbs>
          )}
        </div>

        <div className='flex items-center gap-3 md:gap-5'>
          {rightSection}
          <ActionIcon
            variant='subtle'
            radius='xl'
            className='bg-grey-2 text-dark-500 size-11 shadow-inner md:size-12'
            aria-label='Notifications'>
            <BellIcon color='var(--color-dark-500)' />
          </ActionIcon>
          <UserMenu />
        </div>
      </header>

      {/* Mobile Settings Button (Fixed) */}
      <div className='fixed top-4 right-4 z-50 md:hidden'>
        <ActionIcon
          onClick={openDrawer}
          variant='filled'
          radius='xl'
          size='lg'
          className='bg-primary-6 text-white shadow-lg'
          aria-label='Settings'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' className='size-6'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            />
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
          </svg>
        </ActionIcon>
      </div>

      {/* Mobile Drawer */}
      <Drawer opened={drawerOpened} onClose={closeDrawer} position='right' title='Cài đặt' size='sm'>
        <div className='space-y-4'>
          <div className='border-b border-gray-200 pb-4'>
            <UserMenu />
          </div>
          <div className='space-y-2'>
            <button className='flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left hover:bg-gray-50'>
              <BellIcon className='size-5' />
              <span>Thông báo</span>
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default AppHeader;
