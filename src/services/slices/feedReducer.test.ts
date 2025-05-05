import { describe, expect, test } from '@jest/globals';
import feedReducer, { feedInitialState, getFeedThunk } from './feed';
import { mockFeedData } from './testData';

describe('Тесты ленты заказов feedSlice', () => {
  test('проверка состояния ожидания (pending)', () => {
    const expectedState = {
      ...feedInitialState,
      isLoading: true
    };

    const newState = feedReducer(feedInitialState, {
      type: getFeedThunk.pending.type
    });

    expect(newState).toEqual(expectedState);
  });

  test('проверка состояния отклонено (rejected)', () => {
    const errorMessage = 'Ошибка загрузки ленты заказов';
    const expectedState = {
      ...feedInitialState,
      isLoading: false,
      error: `Ошибка получения фида: ${errorMessage}`
    };

    const newState = feedReducer(feedInitialState, {
      type: getFeedThunk.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('проверка состояния успешной загрузки (fulfilled)', () => {
    const expectedState = {
      ...feedInitialState,
      isLoading: false,
      orders: mockFeedData.orders,
      total: mockFeedData.total,
      totalToday: mockFeedData.totalToday
    };

    const newState = feedReducer(feedInitialState, {
      type: getFeedThunk.fulfilled.type,
      payload: mockFeedData
    });

    expect(newState).toEqual(expectedState);
  });
});
