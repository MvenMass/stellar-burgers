import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import {
  getOrderThunk,
  getOrderSelector,
  getIngredientsSelector
} from '@slices';
import { useDispatch, useSelector } from '@store';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const orderNumber = Number(useParams().number); // Получаем номер заказа
  const dispatch = useDispatch();

  // Получаем данные заказа и ингредиентов из состояния Redux
  const { order: orderData } = useSelector(getOrderSelector);
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  // Загружаем данные заказа при монтировании компонента
  useEffect(() => {
    if (orderNumber) {
      dispatch(getOrderThunk(orderNumber));
    }
  }, [dispatch, orderNumber]);

  // Подготавливаем информацию о заказе
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    // Тип для хранения ингредиентов с количеством
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    // Строим объект с ингредиентами и их количеством
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, ingredientId) => {
        const ingredient = ingredients.find((ing) => ing._id === ingredientId);
        if (ingredient) {
          if (!acc[ingredientId]) {
            acc[ingredientId] = { ...ingredient, count: 1 };
          } else {
            acc[ingredientId].count++;
          }
        }
        return acc;
      },
      {}
    );

    // Вычисляем общую стоимость заказа
    const total = Object.values(ingredientsInfo).reduce(
      (acc, ingredient) => acc + ingredient.price * ingredient.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
