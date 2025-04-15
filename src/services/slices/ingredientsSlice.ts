import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api'; // Импорт API
import { RootState } from '../store';

// Тип состояния ингредиентов
interface IngredientsState {
  selectedIngredient: TIngredient | null;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  selectedIngredient: null, // Изначально нет выбранного ингредиента
  buns: [],
  mains: [],
  sauces: [],
  loading: false,
  error: null
};

// Асинхронный thunk для получения ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi(); // Получение данных
      return data as TIngredient[]; // Возвращаем полученные данные
    } catch (error) {
      return rejectWithValue((error as Error).message); // Обработка ошибки
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients', // Название слайса
  initialState, // Начальное состояние
  reducers: {
    setSelectedIngredient(state, action: PayloadAction<TIngredient | null>) {
      state.selectedIngredient = action.payload; // Установка выбранного ингредиента
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true; // Загрузка данных
        state.error = null; // Сброс ошибки при новом запросе
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false; // Завершение загрузки
        // Разделение ингредиентов по категориям
        state.buns = action.payload.filter((item) => item.type === 'bun');
        state.mains = action.payload.filter((item) => item.type === 'main');
        state.sauces = action.payload.filter((item) => item.type === 'sauce');
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false; // Завершение загрузки при ошибке
        state.error = action.payload as string; // Установка ошибки
      });
  }
});

// Экспорт экшенов и редюсера
export const { setSelectedIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;

// Селектор для получения всех ингредиентов
export const getIngredientsSelector = (state: RootState): TIngredient[] => [
  ...state.ingredients.buns,
  ...state.ingredients.mains,
  ...state.ingredients.sauces
];
