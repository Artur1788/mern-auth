import { useEffect, useRef } from 'react';

import { Route, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';

import { Loader, ProtectedRoute, RedirectAuthUser } from './components';
import { MainLayout } from './layouts';
import { AboutPage, DashboardPage, LoginPage, RegisterPage } from './routes';
import { useAuthStore } from './store';

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isChecked = useRef(false);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (localStorage.getItem('accessToken') && !isChecked.current) {
      checkAuth();
      isChecked.current = true;
    }
  }, [checkAuth]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<DashboardPage />}
          />
          <Route
            path='about'
            element={<AboutPage />}
          />
        </Route>
        <Route
          path='login'
          element={
            <RedirectAuthUser>
              <LoginPage />
            </RedirectAuthUser>
          }
        />
        <Route
          path='register'
          element={
            <RedirectAuthUser>
              <RegisterPage />
            </RedirectAuthUser>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
