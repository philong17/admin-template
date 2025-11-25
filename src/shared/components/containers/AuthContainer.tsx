import { cn } from '@/utils/helpers/cn.helper';
import { Container, Paper } from '@mantine/core';
import { PropsWithChildren } from 'react';

interface AuthContainerProps extends PropsWithChildren {
  className?: string;
}

const AuthContainer = ({ className, children }: AuthContainerProps) => {
  return (
    <Container size='xs' px='md'>
      <Paper
        radius='xl'
        p='xl'
        withBorder
        shadow='xl'
        className={cn(
          'relative overflow-hidden bg-white/95 backdrop-blur-sm',
          'border border-gray-200/50',
          'shadow-2xl shadow-gray-900/10',
          'hover:shadow-3xl transition-all duration-300 hover:shadow-gray-900/15',
          className,
        )}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
        }}>
        {/* Decorative background elements */}
        <div className='absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-xl' />
        <div className='absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-green-400/10 to-blue-400/10 blur-xl' />

        {/* Content */}
        <div className='relative z-10 flex w-full flex-col items-center'>{children}</div>
      </Paper>
    </Container>
  );
};

export default AuthContainer;
