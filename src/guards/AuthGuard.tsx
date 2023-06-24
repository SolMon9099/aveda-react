import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// pages
// import Login from '../pages/auth/Login';
// components
import AdevaLoading from 'src/components/AdevaLoading';
import { useDispatch } from 'src/redux/store';
import { setIsOpen } from 'src/redux/slices/auth';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const dispatch = useDispatch()
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isInitialized) {
    return <AdevaLoading />;
  }

  if (!isAuthenticated) {
    dispatch(setIsOpen(true))
    return <Navigate to={'/forum'} />
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
