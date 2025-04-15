import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { getFeedStateSelector } from '@slices';
import { useSelector } from '../../services/store';

// Функция для получения заказов по статусу
const extractOrdersByStatus = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  // Получаем данные о заказах из стора
  const { orders, total, totalToday } = useSelector(getFeedStateSelector);

  const completedOrders = extractOrdersByStatus(orders, 'done');
  const inProgressOrders = extractOrdersByStatus(orders, 'pending');

  // Объект с информацией о статистике
  const statistics = { total, totalToday };

  return (
    <FeedInfoUI
      readyOrders={completedOrders}
      pendingOrders={inProgressOrders}
      feed={statistics}
    />
  );
};
