import { describe, expect, test } from '@jest/globals';
import orderReducer, { orderInitialState, getOrderThunk } from './orderSlice';
import { orderMockData } from './testData';

describe('Тесты для orderSlice', () => {
  test('Состояние ожидания при получении данных заказа (pending)', () => {
    const expectedState = {
      ...orderInitialState,
      isLoading: true,
      error: null
    };

    const newState = orderReducer(orderInitialState, {
      type: getOrderThunk.pending.type
    });

    expect(newState).toEqual(expectedState);
  });

  test('Ошибка при получении данных заказа (rejected)', () => {
    const errorMessage = 'Ошибка загрузки данных заказа';
    const expectedState = {
      ...orderInitialState,
      isLoading: false,
      error: errorMessage
    };

    const newState = orderReducer(orderInitialState, {
      type: getOrderThunk.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('Успешное получение данных заказа (fulfilled)', () => {
    const expectedState = {
      ...orderInitialState,
      isLoading: false,
      error: null,
      order: orderMockData.orders[0]
    };

    const newState = orderReducer(orderInitialState, {
      type: getOrderThunk.fulfilled.type,
      payload: orderMockData
    });

    expect(newState).toEqual(expectedState);
  });
});
