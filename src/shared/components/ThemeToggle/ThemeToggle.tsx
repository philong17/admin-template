import SunIcon from '@/shared/icons/SunIcon';
import { Button } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

export default function ThemeToggle() {
  const [colorScheme, setColorScheme] = useLocalStorage<'light' | 'dark'>({
    key: 'theme',
    defaultValue: 'light',
  });

  const toggleTheme = () => {
    const newTheme = colorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <Button onClick={toggleTheme} variant='outline'>
      {colorScheme === 'light' ? <></> : <SunIcon />}
    </Button>
  );
}
