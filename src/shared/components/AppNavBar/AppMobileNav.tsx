import { Drawer, ScrollArea } from '@mantine/core';
import { AppNavContent } from './AppNavBar';
import { useSelectedSidebarPath } from './useSelectedPath';

interface AppMobileNavProps {
  opened: boolean;
  onClose: () => void;
}

export const AppMobileNav = ({ opened, onClose }: AppMobileNavProps) => {
  const selectedPath = useSelectedSidebarPath();

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size='100%'
      padding='lg'
      position='left'
      title='Điều hướng'
      classNames={{
        body: 'p-0',
        content: 'bg-white',
        title: 'text-lg font-semibold text-slate-900',
        header: 'shadow-sm border-b border-gray-100',
      }}>
      <ScrollArea className='h-[calc(100vh-72px)] px-2 pt-4 pb-8'>
        <AppNavContent navBarExpanded selectedPath={selectedPath} onNavigate={onClose} />
      </ScrollArea>
    </Drawer>
  );
};
