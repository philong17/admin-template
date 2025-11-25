import { DashboardIcon } from '@/shared/icons';
import { MY_ROUTE } from '@/utils/constants/route.constant';
import { SideBarGroupType } from '@/utils/types/common.type';

export const SLIDE_BAR_ITEMS: SideBarGroupType[] = [
  {
    label: 'Main',
    items: [
      {
        title: 'Dashboard',
        href: MY_ROUTE.DASHBOARD,
        Icon: DashboardIcon,
      },
      // Add your sidebar items here
    ],
  },
];
