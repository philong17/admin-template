import { useLogoutMutation } from '@/services/auth/auth.query';
import { CaretDownIcon } from '@/shared/icons';
import { useAuthStore } from '@/stores/auth.store';
import { useGlobalStore } from '@/stores/global.store';
import { REFRESH_TOKEN } from '@/utils/constants/common.constant';
import { MY_ROUTE } from '@/utils/constants/route.constant';
import CookieService from '@/utils/services/cookie.service';
import { Avatar, Menu } from '@mantine/core';
import { useNavigate } from 'react-router';

const UserMenu = () => {
  const { userInfo } = useGlobalStore();
  const navigate = useNavigate();

  const { mutate: logout } = useLogoutMutation({
    _onSuccess: () => {
      useAuthStore.getState().logout();
      navigate(MY_ROUTE.AUTH.LOGIN, { replace: true });
    },
    _onError: () => {
      // Handle logout error silently
    },
  });

  const handleLogout = () => {
    logout({
      refreshToken: CookieService.get(REFRESH_TOKEN) ?? '',
    });
  };

  return (
    <Menu>
      <Menu.Target>
        <div className='flex h-[50px] cursor-pointer items-center gap-3 rounded-[10px] border border-gray-200 px-3 py-2'>
          <Avatar name='Nhat Ha' radius={10} size={36} />
          <div>
            <p className='text-dark-500 leading-[24px] font-semibold'>{userInfo?.fullname}</p>
            <p className='text-xs leading-[18px] text-gray-500'>{userInfo?.role}</p>
          </div>
          <CaretDownIcon color='var(--color-dark-500)' className='ml-auto size-5' />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item onClick={handleLogout} className='!text-red'>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
