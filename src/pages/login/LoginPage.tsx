import LoginForm from '@/features/login/components/LoginForm';
import AuthContainer from '@/shared/components/containers/AuthContainer';
import { Avatar, Divider, Group, Stack, Text, Title } from '@mantine/core';

const LoginPage = () => {
  return (
    <AuthContainer>
      <Stack align='center' gap='xl' w='100%'>
        {/* Logo and Branding */}
        <Stack align='center' gap='md'>
          <Avatar size='xl' radius='md' variant='gradient' gradient={{ from: 'blue', to: 'cyan', deg: 45 }} className='shadow-lg'>
            <Text size='xl' fw={700} c='white'>
              D
            </Text>
          </Avatar>

          <Stack align='center' gap={4}>
            <Title
              order={1}
              size='h2'
              fw={700}
              style={{
                background: 'linear-gradient(45deg, #3b82f6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
              Dolphin Admin
            </Title>
          </Stack>
        </Stack>

        {/* Divider */}
        <Divider
          w='100%'
          variant='dashed'
          labelPosition='center'
          label={
            <Text size='xs' c='dimmed' px='md'>
              Đăng nhập để tiếp tục
            </Text>
          }
        />

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <Group justify='center' gap='xs' mt='md'>
          <Text size='xs' c='dimmed'>
            © 2025 Dolphin Edu.
          </Text>
          <Text size='xs' c='dimmed'>
            Phiên bản 1.0.0
          </Text>
        </Group>
      </Stack>
    </AuthContainer>
  );
};

export default LoginPage;
