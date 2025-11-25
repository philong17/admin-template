import { Alert, Button, Card, Group, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export const LoginDemo = () => {
  const [demoMode, setDemoMode] = useState<'success' | 'error' | 'loading' | null>(null);

  const simulateLogin = (mode: 'success' | 'error') => {
    setDemoMode('loading');

    setTimeout(() => {
      setDemoMode(mode);

      if (mode === 'success') {
        notifications.show({
          title: 'Demo: Đăng nhập thành công!',
          message: 'Đây là thông báo thành công mẫu',
          color: 'green',
          autoClose: 3000,
        });
      } else {
        notifications.show({
          title: 'Demo: Đăng nhập thất bại!',
          message: 'Email hoặc mật khẩu không chính xác',
          color: 'red',
          autoClose: 5000,
        });
      }

      setTimeout(() => setDemoMode(null), 3000);
    }, 2000);
  };

  return (
    <Card shadow='sm' padding='lg' radius='md' withBorder mt='xl'>
      <Stack gap='md'>
        <Title order={3}>Demo Trải nghiệm đăng nhập</Title>

        <Text size='sm' c='dimmed'>
          Thử nghiệm các trạng thái khác nhau của form đăng nhập:
        </Text>

        {demoMode === 'success' && (
          <Alert color='green' title='Thành công!'>
            Đăng nhập thành công! Đang chuyển hướng...
          </Alert>
        )}

        {demoMode === 'error' && (
          <Alert color='red' title='Lỗi!'>
            Email hoặc mật khẩu không chính xác
          </Alert>
        )}

        <Group grow>
          <Button
            variant='outline'
            color='green'
            onClick={() => simulateLogin('success')}
            loading={demoMode === 'loading'}
            disabled={demoMode !== null}>
            Demo Thành công
          </Button>

          <Button
            variant='outline'
            color='red'
            onClick={() => simulateLogin('error')}
            loading={demoMode === 'loading'}
            disabled={demoMode !== null}>
            Demo Lỗi
          </Button>
        </Group>

        <Text size='xs' c='dimmed' ta='center'>
          * Đây chỉ là demo, không ảnh hưởng đến đăng nhập thực tế
        </Text>
      </Stack>
    </Card>
  );
};
