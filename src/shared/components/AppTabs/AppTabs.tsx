import { TabType } from '@/utils/types/common.type';
import { Tabs, TabsProps } from '@mantine/core';
import { PropsWithChildren } from 'react';

import classes from './AppTabs.module.css';

interface AppTabsProps extends PropsWithChildren, TabsProps {
  tabs: TabType[];
  value: string | null;
  onChange?: (value: string | null) => void;
}

const AppTabs = ({ tabs, value, onChange, children, ...rest }: AppTabsProps) => {
  return (
    <Tabs value={value} onChange={onChange} className='w-full' classNames={classes} {...rest}>
      <Tabs.List className='!flex-shrink-0'>
        {tabs.map((tab, index) => (
          <Tabs.Tab key={index} value={tab.value} leftSection={tab.Icon ? <tab.Icon /> : null}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {children}
    </Tabs>
  );
};

export default AppTabs;
