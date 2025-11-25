import { useMemo } from 'react';
import { useLocation } from 'react-router';

export const useSelectedSidebarPath = (): [string | undefined, string | undefined] => {
  const location = useLocation();

  return useMemo(() => {
    const paths = location.pathname.split('/');
    return [paths[1], paths[2]];
  }, [location.pathname]);
};
