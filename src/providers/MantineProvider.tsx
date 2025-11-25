import { createTheme, MantineProvider as UIProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { useLocalStorage } from '@mantine/hooks';
import { ReactNode, useEffect } from 'react';

const theme = createTheme({
  fontFamily: 'Lexend, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Lexend, sans-serif' },
  breakpoints: {
    sm: '40rem',
    md: '48rem',
    lg: '64rem',
    xl: '80rem',
    '2xl': '96rem',
  },
});

const MantineProvider = ({ children }: { children: ReactNode }) => {
  const [colorScheme] = useLocalStorage({
    key: 'theme',
    defaultValue: 'light',
  });

  useEffect(() => {
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [colorScheme]);

  return (
    <UIProvider defaultColorScheme='light' theme={theme}>
      <Notifications />
      {children}
    </UIProvider>
  );
};

export default MantineProvider;
