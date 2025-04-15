import {
  createSlice,
  createAsyncThunk,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

interface ConstructorState {
  isLoading: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

const initialState: ConstructorState = {
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

// Асинхронный thunk для отправки заказа
export const sendOrderThunk = createAsyncThunk(
  'constructorBurg/sendOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

const constructorSlice = createSlice({
  name: 'constructorBurg',
  initialState,
  reducers: {
    // Добавление ингредиента в конструктор
    addIngredientToBasket: {
      reducer: (state, action) => {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.constructorItems.bun = ingredient;
        } else {
          state.constructorItems.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() },
        error: undefined,
        meta: undefined
      })
    },

    // Удаление ингредиента из конструктора
    deleteIngredientFromBasket: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== ingredientId
        );
    },

    // Установка состояния запроса заказа
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },

    // Сброс данных модального окна заказа
    setNullOrderModalData: (state) => {
      state.orderModalData = null;
    },

    // Перемещение ингредиента вверх
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      [ingredients[index], ingredients[index - 1]] = [
        ingredients[index - 1],
        ingredients[index]
      ];
    },

    // Перемещение ингредиента вниз
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      [ingredients[index], ingredients[index + 1]] = [
        ingredients[index + 1],
        ingredients[index]
      ];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendOrderThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Unknown error';
      })
      .addCase(sendOrderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export const {
  addIngredientToBasket,
  deleteIngredientFromBasket,
  setOrderRequest,
  setNullOrderModalData,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;

export const getConstructorSelector = (state: {
  constructorBurg: ConstructorState;
}) => state.constructorBurg;

export default constructorSlice.reducer;
