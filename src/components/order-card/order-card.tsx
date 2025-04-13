import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '@slices';

const MAX_INGREDIENTS = 6; // Константа для ограничения количества ингредиентов

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  // Получаем список всех ингредиентов из стора
  const ingredientsList: TIngredient[] = useSelector(getIngredientsSelector);

  // Вычисление информации о заказе
  const orderDetails = useMemo(() => {
    if (!ingredientsList.length) return null;

    // Получаем список ингредиентов, которые находятся в заказе
    const matchedIngredients = order.ingredients.reduce(
      (acc: TIngredient[], ingredientId: string) => {
        const ingredient = ingredientsList.find(
          (ing) => ing._id === ingredientId
        );
        if (ingredient) acc.push(ingredient);
        return acc;
      },
      []
    );

    const totalCost = matchedIngredients.reduce(
      (acc, item) => acc + item.price,
      0
    );

    const ingredientsToDisplay = matchedIngredients.slice(0, MAX_INGREDIENTS);

    const remainingIngredients =
      matchedIngredients.length > MAX_INGREDIENTS
        ? matchedIngredients.length - MAX_INGREDIENTS
        : 0;

    const createdAt = new Date(order.createdAt);

    return {
      ...order,
      ingredientsInfo: matchedIngredients,
      ingredientsToShow: ingredientsToDisplay,
      remains: remainingIngredients,
      total: totalCost,
      date: createdAt
    };
  }, [order, ingredientsList]);

  if (!orderDetails) return null;

  return (
    <OrderCardUI
      orderInfo={orderDetails}
      maxIngredients={MAX_INGREDIENTS}
      locationState={{ background: location }}
    />
  );
});
