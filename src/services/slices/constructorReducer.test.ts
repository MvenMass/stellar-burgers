import constructorReducer, {
  addIngredientToBasket,
  deleteIngredientFromBasket,
  initialState,
  moveIngredientUp,
  moveIngredientDown,
  sendOrderThunk,
  setOrderRequest,
  setNullOrderModalData
} from './constructorSlice';

import { itemsToAdd, itemsToMove, mockNewOrder } from './testData';

describe('constructorSlice: unit-тесты редьюсера', () => {
  describe('логика добавления и удаления', () => {
    it('должен корректно добавлять булку', () => {
      const bunToAdd = itemsToAdd[0];
      const result = constructorReducer(
        initialState,
        addIngredientToBasket(bunToAdd)
      );

      expect(result.constructorItems.bun).toEqual(
        expect.objectContaining(bunToAdd)
      );
    });

    it('должен корректно добавлять начинку', () => {
      const filler = itemsToAdd[1];
      const result = constructorReducer(
        initialState,
        addIngredientToBasket(filler)
      );

      expect(result.constructorItems.ingredients).toEqual(
        expect.arrayContaining([expect.objectContaining(filler)])
      );
    });

    it('должен корректно удалять ингредиент из списка', () => {
      const stateWithIngredient = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients: [itemsToMove[1]]
        }
      };

      const result = constructorReducer(
        stateWithIngredient,
        deleteIngredientFromBasket(itemsToMove[1].id)
      );

      expect(result.constructorItems.ingredients).toEqual([]);
    });
  });

  describe('перемещение ингредиентов в списке', () => {
    const baseState = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [...itemsToMove]
      }
    };

    it('перемещает ингредиент вверх по списку', () => {
      const result = constructorReducer(baseState, moveIngredientUp(2));

      expect(result.constructorItems.ingredients[2].id).toBe(
        baseState.constructorItems.ingredients[1].id
      );
      expect(result.constructorItems.ingredients[1].id).toBe(
        baseState.constructorItems.ingredients[2].id
      );
    });

    it('перемещает ингредиент вниз по списку', () => {
      const result = constructorReducer(baseState, moveIngredientDown(1));

      expect(result.constructorItems.ingredients[1].id).toBe(
        baseState.constructorItems.ingredients[2].id
      );
      expect(result.constructorItems.ingredients[2].id).toBe(
        baseState.constructorItems.ingredients[1].id
      );
    });
  });

  describe('обработка состояний запроса заказа', () => {
    it('устанавливает флаг ожидания при pending', () => {
      const result = constructorReducer(initialState, {
        type: sendOrderThunk.pending.type
      });

      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });

    it('обрабатывает ошибку при rejected', () => {
      const errorMsg = 'Ошибка создания заказа';

      const result = constructorReducer(initialState, {
        type: sendOrderThunk.rejected.type,
        error: { message: errorMsg }
      });

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        error: errorMsg
      });
    });

    it('завершает заказ при fulfilled', () => {
      const result = constructorReducer(initialState, {
        type: sendOrderThunk.fulfilled.type,
        payload: { order: mockNewOrder.orders[0] }
      });

      expect(result).toEqual({
        ...initialState,
        isLoading: false,
        error: null,
        orderRequest: false,
        orderModalData: mockNewOrder.orders[0],
        constructorItems: {
          bun: null,
          ingredients: []
        }
      });
    });
  });

  describe('вспомогательные действия', () => {
    it('включает флаг orderRequest', () => {
      const result = constructorReducer(initialState, setOrderRequest(true));
      expect(result.orderRequest).toBe(true);
    });

    it('очищает данные заказа в модальном окне', () => {
      const stateWithModalData = {
        ...initialState,
        orderModalData: mockNewOrder.orders[0]
      };

      const result = constructorReducer(
        stateWithModalData,
        setNullOrderModalData()
      );

      expect(result.orderModalData).toBeNull();
    });
  });
});
