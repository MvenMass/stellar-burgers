import { expect, test } from '@jest/globals';
import { rootReducer } from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';

describe('тесты инициализации rootReducer', () => {
  test('Проверка инициализации rootReducer', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const action = { type: 'UNKNOWN_ACTION' };
    const testState = rootReducer(undefined, action);
    expect(testState).toEqual(store.getState());
  });
});
