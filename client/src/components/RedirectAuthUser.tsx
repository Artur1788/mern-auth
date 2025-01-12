import { FC } from 'react';
import { useAuthStore } from '../store';
import { Navigate } from 'react-router';

interface RedirectAuthUserProps {
  children: React.ReactNode;
}

export const RedirectAuthUser: FC<RedirectAuthUserProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return children;
};
