import { FC, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../services/rootReducer';
import { setSelectedIngredient } from '../../services/slices/ingredientsSlice';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const chosenIngredient = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient
  );

  const allAvailableIngredients: TIngredient[] = [
    ...useSelector((state: RootState) => state.ingredients.buns),
    ...useSelector((state: RootState) => state.ingredients.mains),
    ...useSelector((state: RootState) => state.ingredients.sauces)
  ];

  useEffect(() => {
    if (!chosenIngredient && id) {
      const foundItem = allAvailableIngredients.find((item) => item._id === id);
      if (foundItem) {
        dispatch(setSelectedIngredient(foundItem));
      }
    }
  }, [chosenIngredient, id, allAvailableIngredients, dispatch]);

  if (!chosenIngredient) {
    return <Preloader />;
  }

  const isModal = !!location.state?.background;

  return (
    <IngredientDetailsUI ingredientData={chosenIngredient} isModal={isModal} />
  );
};
