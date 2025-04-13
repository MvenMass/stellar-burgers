import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

// Тип состояния заказа
interface OrderState {
  isLoading: boolean;
  order: TOrder | null;
  error: string | null;
}

// Начальное состояние слайса заказа
const initialState: OrderState = {
  isLoading: false,
  order: null,
  error: null
};

// Асинхронный thunk для получения заказа по номеру
export const getOrderThunk = createAsyncThunk(
  'feed/getOrder',
  getOrderByNumberApi
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(getOrderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.order = payload.orders[0];
      });
  }
});

// Селектор для получения состояния заказа
export const getOrderSelector = (state: { orders: OrderState }) => state.orders;

// Экспорт редюсера
export default orderSlice.reducer;
