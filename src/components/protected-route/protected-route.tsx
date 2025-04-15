/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isAuthorizedSelector, getRequestUser } from '@slices';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth
}) => {
  const location = useLocation();

  const userLoggedIn = useSelector(isAuthorizedSelector);
  const userIsLoading = useSelector(getRequestUser);

  // Отображаем прелоадер, пока загружаются данные пользователя
  if (userIsLoading) {
    return <Preloader />;
  }

  // Защита от перехода авторизованного пользователя на страницы для неавторизованных
  if (onlyUnAuth && userLoggedIn) {
    const redirectPath = location.state?.from?.pathname || '/';
    return <Navigate to={redirectPath} replace />;
  }

  // Защита от перехода неавторизованного пользователя на защищённые страницы
  if (!onlyUnAuth && !userLoggedIn) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
