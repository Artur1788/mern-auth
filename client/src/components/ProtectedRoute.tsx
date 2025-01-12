import { FC } from 'react';
import { useAuthStore } from '../store';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
      />
    );
  }

  return children;
};
