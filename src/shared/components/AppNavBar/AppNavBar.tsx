import AppLogoFull from '@/assets/images/AppLogoFull.png';
import { CaretUpIcon } from '@/shared/icons';
import { SLIDE_BAR_ITEMS } from '@/utils/constants/sideBar.constant';
import { SideBarGroupItemType, SideBarItemType } from '@/utils/types/common.type';
import { AppShell, Collapse, Image, rem, ScrollArea, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { AppNavBarGroupItem } from './AppNavBarGroupItem';
import { AppNavBarItem } from './AppNavBarItem';
import { useSelectedSidebarPath } from './useSelectedPath';

interface AppNavBarProps {
  navBarExpanded: boolean;
}

interface NavContentProps extends AppNavBarProps {
  selectedPath: [string | undefined, string | undefined];
  onNavigate?: () => void;
}

const AppNavBarTopic = ({
  label,
  children,
  navBarExpanded,
}: {
  label: string;
  children: React.ReactNode;
  navBarExpanded: boolean;
}) => {
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <div className='w-full'>
      <div
        className={twMerge(
          'text-primary-6 flex h-9 w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-gray-100',
          navBarExpanded ? 'opacity-100' : 'pointer-events-none hidden opacity-0',
        )}
        onClick={toggle}>
        <span>{label}</span>
        <CaretUpIcon
          width={16}
          height={16}
          fill='var(--color-primary-6)'
          className={twMerge('transition-transform', opened ? '' : 'rotate-180')}
        />
      </div>
      <Collapse in={opened}>
        <Stack gap={4} pl={0}>
          {children}
        </Stack>
      </Collapse>
    </div>
  );
};

export const AppNavContent = ({ navBarExpanded, selectedPath, onNavigate }: NavContentProps) => {
  const renderSideBarItem = (item: SideBarItemType | SideBarGroupItemType, key: number) =>
    'items' in item ? (
      <AppNavBarGroupItem
        key={key}
        navBarExpanded={navBarExpanded}
        selectedPath={selectedPath}
        onNavigate={onNavigate}
        {...item}
      />
    ) : (
      <AppNavBarItem key={key} navBarExpanded={navBarExpanded} selectedPath={selectedPath} onNavigate={onNavigate} {...item} />
    );

  return (
    <>
      {!onNavigate && <Image src={AppLogoFull} w={rem(140)} h='auto' className='mx-auto md:ml-4' />}
      <Stack gap={4} mt={onNavigate ? rem(0) : rem(24)} component={ScrollArea} className='px-2'>
        {SLIDE_BAR_ITEMS.map((item, index) => (
          <AppNavBarTopic key={`group-${index}`} label={item.label} navBarExpanded={navBarExpanded}>
            {item.items.map((subItem, subIndex) => renderSideBarItem(subItem, subIndex))}
          </AppNavBarTopic>
        ))}
      </Stack>
    </>
  );
};

export const AppNavBar = ({ navBarExpanded }: AppNavBarProps) => {
  const selectedPath = useSelectedSidebarPath();

  return (
    <AppShell.Navbar
      visibleFrom='md'
      zIndex={100}
      className={`!bg-[#A2A1A8]/[0.05] pt-4 transition-all md:flex md:flex-col ${navBarExpanded ? 'overflow-y-auto px-2' : 'overflow-hidden px-0'}`}
      withBorder={false}>
      <AppNavContent navBarExpanded={navBarExpanded} selectedPath={selectedPath} />
    </AppShell.Navbar>
  );
};
