import { FC } from 'react';
import { useSelector } from '../../services/store';
import { getUserSelector } from '../../services/slices/userSlice';

import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const user = useSelector(getUserSelector);
  const displayName = user?.name;

  return <AppHeaderUI userName={displayName} />;
};
