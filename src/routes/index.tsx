import AuthLayout from '@/layouts/AuthLayout';
import ProtectedLayout from '@/layouts/ProtectedLayout';
import DashboardPage from '@/pages/dashboard';
import LoginPage from '@/pages/login/LoginPage';
import { MY_ROUTE } from '@/utils/constants/route.constant';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to={MY_ROUTE.DASHBOARD} replace />} />

        <Route element={<ProtectedLayout />}>
          <Route path={MY_ROUTE.DASHBOARD} element={<DashboardPage />} />
          {/* Add your protected routes here */}
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={MY_ROUTE.AUTH.LOGIN} element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
