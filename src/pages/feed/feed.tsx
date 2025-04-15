import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeedThunk, getOrdersSelector } from '@slices';
import { useDispatch, useSelector } from '@store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  // Получаем список заказов из Redux-состояния
  const orders: TOrder[] = useSelector(getOrdersSelector);

  // Функция для получения данных заказов
  const handleGetFeeds = () => {
    dispatch(getFeedThunk());
  };

  // Загружаем заказы при монтировании компонента
  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  // Если заказы не загружены, показываем прелоадер
  if (!orders.length) {
    return <Preloader />;
  }

  // Отображаем UI компонента с переданными данными
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
