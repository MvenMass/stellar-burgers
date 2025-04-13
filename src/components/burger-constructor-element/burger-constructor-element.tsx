import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from 'react-redux';
import {
  deleteIngredientFromBasket,
  moveIngredientUp,
  moveIngredientDown
} from '@slices';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    // передвигаем ингредиент в бургере вниз
    const handleMoveDown = () => {
      dispatch(moveIngredientDown(index));
    };
    // передвигаем ингредиент в бургере вверх
    const handleMoveUp = () => {
      dispatch(moveIngredientUp(index));
    };
    // удаляем ингредиент из бургера
    const handleClose = () => {
      dispatch(deleteIngredientFromBasket(ingredient.id));
    };
    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
