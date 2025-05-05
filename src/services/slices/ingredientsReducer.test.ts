import { describe, expect, test } from '@jest/globals';
import ingredientsReducer, {
  ingredientsInitialState,
  fetchIngredients
} from './ingredientsSlice';
import { mockIngredientData } from './testData';

describe('Тесты ingredientsSlice', () => {
  test('проверка состояния ожидания (pending)', () => {
    const expectedState = {
      ...ingredientsInitialState,
      loading: true,
      error: null
    };

    const newState = ingredientsReducer(ingredientsInitialState, {
      type: fetchIngredients.pending.type
    });

    expect(newState).toEqual(expectedState);
  });

  test('проверка состояния отклонено (rejected)', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';

    const expectedState = {
      ...ingredientsInitialState,
      loading: false,
      error: errorMessage
    };

    const newState = ingredientsReducer(ingredientsInitialState, {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    });

    expect(newState).toEqual(expectedState);
  });

  test('проверка состояния успешной загрузки (fulfilled)', () => {
    const expectedState = {
      ...ingredientsInitialState,
      loading: false,
      error: null,
      buns: [mockIngredientData.ingredients[0]], // bun
      mains: [mockIngredientData.ingredients[1]], // main
      sauces: [mockIngredientData.ingredients[2]] // sauce
    };

    const newState = ingredientsReducer(ingredientsInitialState, {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredientData.ingredients
    });

    expect(newState).toEqual(expectedState);
  });
});
