import { describe, expect, test, jest } from '@jest/globals';
import userReducer, {
  userInitialState,
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk
} from './userSlice';
import { userMockData, mockPayload } from './testData';

describe('Тесты для userSlice', () => {
  test('Состояние ожидания при логине (pending)', () => {
    const expectedState = {
      ...userInitialState,
      isLoading: true,
      error: null
    };

    const newState = userReducer(userInitialState, {
      type: loginUserThunk.pending.type
    });

    expect(newState).toEqual(expectedState);
  });

  test('Ошибка при логине (rejected)', () => {
    const errorMessage = 'Ошибка входа';
    const expectedState = {
      ...userInitialState,
      isLoading: false,
      error: errorMessage
    };

    const newState = userReducer(userInitialState, {
      type: loginUserThunk.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('Успешный логин (fulfilled)', () => {
    const expectedState = {
      ...userInitialState,
      isLoading: false,
      error: null,
      user: mockPayload.user,
      isAuthorized: true
    };

    const newState = userReducer(userInitialState, {
      type: loginUserThunk.fulfilled.type,
      payload: mockPayload
    });

    expect(newState).toEqual(expectedState);
  });

  test('Состояние ожидания при регистрации (pending)', () => {
    const expectedState = {
      ...userInitialState,
      isLoading: true,
      error: null
    };

    const newState = userReducer(userInitialState, {
      type: registerUserThunk.pending.type
    });

    expect(newState).toEqual(expectedState);
  });

  test('Ошибка при регистрации (rejected)', () => {
    const errorMessage = 'Ошибка регистрации';
    const expectedState = {
      ...userInitialState,
      isLoading: false,
      error: errorMessage
    };

    const newState = userReducer(userInitialState, {
      type: registerUserThunk.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('Успешная регистрация (fulfilled)', () => {
    const expectedState = {
      ...userInitialState,
      isLoading: false,
      error: null,
      user: mockPayload.user,
      isAuthorized: true
    };

    const newState = userReducer(userInitialState, {
      type: registerUserThunk.fulfilled.type,
      payload: mockPayload
    });

    expect(newState).toEqual(expectedState);
  });

  test('Состояние ожидания при выходе (pending)', () => {
    const expectedState = {
      ...userInitialState,
      isLoading: true,
      error: null
    };

    const newState = userReducer(userInitialState, {
      type: logoutUserThunk.pending.type
    });

    expect(newState).toEqual(expectedState);
  });

  test('Ошибка при выходе (rejected)', () => {
    const errorMessage = 'Ошибка выхода';
    const expectedState = {
      ...userInitialState,
      isLoading: false,
      error: errorMessage
    };

    const newState = userReducer(userInitialState, {
      type: logoutUserThunk.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('Успешный выход (fulfilled)', () => {
    const expectedState = {
      ...userInitialState,
      isLoading: false,
      error: null,
      user: null,
      isAuthorized: false
    };

    const newState = userReducer(userInitialState, {
      type: logoutUserThunk.fulfilled.type
    });

    expect(newState).toEqual(expectedState);
  });

  test('Состояние ожидания при получении пользователя (pending)', () => {
    const expectedState = {
      ...userInitialState,
      isLoading: true,
      error: null
    };

    const newState = userReducer(userInitialState, {
      type: getUserThunk.pending.type
    });

    expect(newState).toEqual(expectedState);
  });

  test('Ошибка при получении пользователя (rejected)', () => {
    const errorMessage = 'Ошибка получения данных пользователя';
    const expectedState = {
      ...userInitialState,
      isLoading: false,
      error: errorMessage
    };

    const newState = userReducer(userInitialState, {
      type: getUserThunk.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('Успешное получение пользователя (fulfilled)', () => {
    const expectedState = {
      ...userInitialState,
      isLoading: false,
      error: null,
      user: userMockData.user,
      isAuthorized: true
    };

    const newState = userReducer(userInitialState, {
      type: getUserThunk.fulfilled.type,
      payload: userMockData
    });

    expect(newState).toEqual(expectedState);
  });

  test('Состояние ожидания при обновлении пользователя (pending)', () => {
    const expectedState = {
      ...userInitialState,
      isLoading: true,
      error: null
    };

    const newState = userReducer(userInitialState, {
      type: updateUserThunk.pending.type
    });

    expect(newState).toEqual(expectedState);
  });

  test('Ошибка при обновлении пользователя (rejected)', () => {
    const errorMessage = 'Ошибка обновления пользователя';
    const expectedState = {
      ...userInitialState,
      isLoading: false,
      error: errorMessage
    };

    const newState = userReducer(userInitialState, {
      type: updateUserThunk.rejected.type,
      error: { message: errorMessage }
    });

    expect(newState).toEqual(expectedState);
  });

  test('Успешное обновление пользователя (fulfilled)', () => {
    const updatedUser = { name: 'Updated Name', email: 'updated@example.com' };
    const expectedState = {
      ...userInitialState,
      isLoading: false,
      error: null,
      user: updatedUser,
      isAuthorized: true
    };

    const newState = userReducer(userInitialState, {
      type: updateUserThunk.fulfilled.type,
      payload: { user: updatedUser }
    });

    expect(newState).toEqual(expectedState);
  });
});
