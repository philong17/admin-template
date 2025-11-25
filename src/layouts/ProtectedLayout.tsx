import LoadingPage from '@/pages/loading';
import { useAdminInfoQuery, useCheckAuth } from '@/services/auth/auth.query';
import { AppMobileNav } from '@/shared/components/AppNavBar/AppMobileNav';
import { AppNavBar } from '@/shared/components/AppNavBar';
import { useAuthStore } from '@/stores/auth.store';
import { useGlobalStore } from '@/stores/global.store';
import { MY_ROUTE } from '@/utils/constants/route.constant';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';

const ProtectedLayout = () => {
  const [navBarExpanded, { toggle: toggleNavBar }] = useDisclosure(true);
  const navBarWidth = navBarExpanded ? 250 : 0;
  const [mobileNavOpened, { toggle: toggleMobileNav, close: closeMobileNav }] = useDisclosure(false);
  const navigate = useNavigate();

  const { data, isLoading } = useCheckAuth();

  const { data: userInfo, isError } = useAdminInfoQuery(true);
  const { setUserInfo } = useGlobalStore();

  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo, setUserInfo]);

  useEffect(() => {
    if (data && !data.authenticated) {
      useAuthStore.getState().logout();
      navigate(MY_ROUTE.AUTH.LOGIN, { replace: true });
    }
  }, [data, navigate]);

  if (isLoading || !data) {
    return <LoadingPage />;
  }

  if (!data.authenticated) {
    return <LoadingPage />;
  }

  if (isError) {
    useAuthStore.getState().logout();
    navigate(MY_ROUTE.AUTH.LOGIN, { replace: true });
  }

  return (
    <>
      <div className='sticky top-0 z-40 flex items-center justify-between border-b border-white/20 bg-white/95 px-4 py-3 shadow-sm backdrop-blur md:hidden'>
        <Burger opened={mobileNavOpened} onClick={toggleMobileNav} aria-label='Navigation' size='sm' />
        <span className='text-sm font-semibold text-slate-900'>Admin Dashboard</span>
        <div className='size-8' />
      </div>

      <AppShell
        navbar={{
          width: { base: 0, md: navBarWidth },
          breakpoint: 'md',
          collapsed: { mobile: true, desktop: !navBarExpanded },
        }}
        withBorder={false}>
        <AppNavBar navBarExpanded={navBarExpanded} />
        <AppShell.Main className='bg-grey-3 relative px-0 pt-4'>
          {/* Desktop Toggle Button */}
          <button
            onClick={toggleNavBar}
            className='bg-primary-6 hover:bg-primary-7 fixed top-1/2 z-40 hidden -translate-y-1/2 rounded-r-lg p-2 text-white shadow-lg transition-all md:block'
            style={{ left: navBarWidth }}
            aria-label='Toggle Sidebar'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              className={`size-5 transition-transform ${navBarExpanded ? 'rotate-180' : ''}`}>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </button>

          <Suspense fallback={<LoadingPage />}>
            <Outlet />
          </Suspense>
        </AppShell.Main>
      </AppShell>

      <AppMobileNav opened={mobileNavOpened} onClose={closeMobileNav} />
    </>
  );
};

export default ProtectedLayout;
