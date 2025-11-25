import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div
      className='relative flex min-h-screen items-center justify-center overflow-visible px-4 py-8 sm:px-6 md:overflow-hidden'
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full bg-white/10 blur-3xl' />
        <div
          className='absolute -bottom-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-white/5 blur-3xl'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-white/5 blur-2xl'
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Content */}
      <div className='relative z-10 w-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
