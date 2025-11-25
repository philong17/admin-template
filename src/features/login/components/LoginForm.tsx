import { useLoginMutation } from '@/services/auth/auth.query';
import { useAuthStore } from '@/stores/auth.store';
import { useGlobalStore } from '@/stores/global.store';
import { MY_ROUTE } from '@/utils/constants/route.constant';
import CookieService from '@/utils/services/cookie.service';
import {
  Alert,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  rem,
  Stack,
  Text,
  TextInput,
  Transition,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore();
  const { setUserInfo } = useGlobalStore();
  const [loginError, setLoginError] = useState<string>('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form validation
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: {
      email: (value) => {
        if (!value) return 'Email là bắt buộc';
        if (!/^\S+@\S+$/.test(value)) return 'Email không hợp lệ';
        return null;
      },
      password: (value) => {
        if (!value) return 'Mật khẩu là bắt buộc';
        if (value.length < 6) return 'Mật khẩu phải có ít nhất 6 ký tự';
        return null;
      },
    },
  });

  const { mutate: login, isPending } = useLoginMutation({
    _onSuccess: (data) => {
      setLoginError('');
      setShowSuccess(true);

      // Show success notification
      notifications.show({
        title: 'Đăng nhập thành công!',
        message: `Chào mừng ${data.data.admin_user.fullname}`,
        color: 'green',
        autoClose: 3000,
      });

      // Set auth data
      setAccessToken(data.data.access_token);
      CookieService.setRefreshToken(data.data.refresh_token);
      setUserInfo(data.data.admin_user);

      // Handle remember me
      if (form.values.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('lastEmail', form.values.email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('lastEmail');
      }

      // Navigate after a short delay for better UX
      setTimeout(() => {
        navigate(MY_ROUTE.DASHBOARD);
      }, 1500);
    },
    _onError: (error: any) => {
      setShowSuccess(false);

      // Extract error message
      let errorMessage = 'Đã xảy ra lỗi không xác định';

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.response?.status === 401) {
        errorMessage = 'Email hoặc mật khẩu không chính xác';
      } else if (error?.response?.status === 403) {
        errorMessage = 'Tài khoản của bạn không có quyền truy cập';
      } else if (error?.response?.status === 429) {
        errorMessage = 'Quá nhiều lần thử đăng nhập. Vui lòng thử lại sau';
      } else if (error?.message) {
        errorMessage = error.message;
      }

      setLoginError(errorMessage);

      // Show error notification
      notifications.show({
        title: 'Đăng nhập thất bại!',
        message: errorMessage,
        color: 'red',
        autoClose: 5000,
      });
    },
  });

  // Load remembered email on component mount
  React.useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const lastEmail = localStorage.getItem('lastEmail');

    if (rememberMe && lastEmail) {
      form.setValues({
        email: lastEmail,
        password: '',
        rememberMe: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: LoginFormValues) => {
    setLoginError('');
    setIsLoggingIn(true);

    // Simulate a brief loading state for better UX
    setTimeout(() => {
      login({
        email: values.email.trim(),
        password: values.password,
      });
      setIsLoggingIn(false);
    }, 500);
  };

  const isLoading = isPending || isLoggingIn;

  return (
    <div className='relative mt-8 w-full'>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'md', blur: 2 }}
        loaderProps={{ color: 'var(--color-primary-400)', type: 'dots' }}
      />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap='md'>
          {/* Error Alert */}
          <Transition mounted={!!loginError} transition='fade' duration={300} timingFunction='ease'>
            {(styles) => (
              <Alert color='red' title='Đăng nhập thất bại' style={styles} variant='light'>
                {loginError}
              </Alert>
            )}
          </Transition>

          {/* Success Alert */}
          <Transition mounted={showSuccess} transition='fade' duration={300} timingFunction='ease'>
            {(styles) => (
              <Alert color='green' title='Đăng nhập thành công!' style={styles} variant='light'>
                Đang chuyển hướng đến trang chủ...
              </Alert>
            )}
          </Transition>

          {/* Email Input */}
          <TextInput
            withAsterisk
            label='Email'
            placeholder='Nhập địa chỉ email'
            size='md'
            disabled={isLoading}
            classNames={{
              input: 'focus:!border-primary-400 focus:!border-2',
              error: 'text-red-500',
            }}
            {...form.getInputProps('email')}
          />

          {/* Password Input */}
          <PasswordInput
            withAsterisk
            label='Mật khẩu'
            placeholder='Nhập mật khẩu'
            size='md'
            disabled={isLoading}
            classNames={{
              input: 'focus:!border-primary-400 focus:!border-2',
              error: 'text-red-500',
            }}
            {...form.getInputProps('password')}
          />

          {/* Remember Me Checkbox */}
          <Group justify='space-between' mt='xs'>
            <Checkbox
              label='Ghi nhớ đăng nhập'
              size='sm'
              disabled={isLoading}
              {...form.getInputProps('rememberMe', { type: 'checkbox' })}
            />
            <Text
              size='sm'
              c='dimmed'
              style={{ cursor: 'pointer' }}
              onClick={() => {
                notifications.show({
                  title: 'Quên mật khẩu',
                  message: 'Tính năng này sẽ được cập nhật sớm',
                  color: 'blue',
                });
              }}>
              Quên mật khẩu?
            </Text>
          </Group>

          {/* Submit Button */}
          <Button
            type='submit'
            fullWidth
            size='lg'
            radius='md'
            mt={rem(20)}
            loading={isLoading}
            disabled={isLoading}
            color='var(--color-primary-400)'
            classNames={{
              root: 'transition-all duration-200 hover:scale-[1.02]',
              label: '!text-base !font-medium',
            }}>
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default LoginForm;
