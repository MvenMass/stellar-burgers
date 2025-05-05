import {
  createSlice,
  createAsyncThunk,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

export interface ConstructorState {
  ingredients: any;
  isLoading: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
}

// Экспортируем начальное состояние
export const initialState: ConstructorState = {
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null,
  ingredients: undefined
};

// Асинхронный thunk для отправки заказа
export const sendOrderThunk = createAsyncThunk(
  'constructorBurg/sendOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructorBurg',
  initialState,
  reducers: {
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

    deleteIngredientFromBasket: (state, action: PayloadAction<string>) => {
      const ingredientId = action.payload;
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== ingredientId
        );
    },

    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },

    setNullOrderModalData: (state) => {
      state.orderModalData = null;
    },

    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      if (index > 0) {
        [ingredients[index], ingredients[index - 1]] = [
          ingredients[index - 1],
          ingredients[index]
        ];
      }
    },

    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      if (index < ingredients.length - 1) {
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
      }
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
