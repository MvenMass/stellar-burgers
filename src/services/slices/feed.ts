import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { createSelector } from 'reselect';
import { RootState } from '../store'; // Импорт корневого состояния

// Тип состояния
export interface feedState {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

// Начальное состояние
const initialState: feedState = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

// Асинхронные thunks
export const getFeedThunk = createAsyncThunk('feed/getFeed', getFeedsApi);

export const getOrdersThunk = createAsyncThunk(
  'feed/getProfileFeed',
  getOrdersApi
);

// Утилиты для обработки состояний загрузки и ошибок
const handlePending = (state: feedState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: feedState, error: string) => {
  state.isLoading = false;
  state.error = error;
};

// Слайс
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка getFeedThunk
      .addCase(getFeedThunk.pending, handlePending)
      .addCase(getFeedThunk.rejected, (state, { error }) =>
        handleRejected(state, `Ошибка получения фида: ${error.message}`)
      )
      .addCase(
        getFeedThunk.fulfilled,
        (
          state,
          {
            payload
          }: PayloadAction<{
            orders: TOrder[];
            total: number;
            totalToday: number;
          }>
        ) => {
          state.isLoading = false;
          state.error = null;
          state.orders = payload.orders;
          state.total = payload.total;
          state.totalToday = payload.totalToday;
        }
      )
      // Обработка getOrdersThunk
      .addCase(getOrdersThunk.pending, handlePending)
      .addCase(getOrdersThunk.rejected, (state, { error }) =>
        handleRejected(state, `Ошибка получения заказов: ${error.message}`)
      )
      .addCase(
        getOrdersThunk.fulfilled,
        (state, { payload }: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.error = null;
          state.orders = payload;
        }
      );
  }
});

// Селекторы
export const getFeedStateSelector = (state: RootState) => state.feed;

export const getOrdersSelector = createSelector(
  getFeedStateSelector,
  (feed) => feed.orders
);

export const getTotalSelector = createSelector(
  getFeedStateSelector,
  (feed) => feed.total
);

export const getTotalTodaySelector = createSelector(
  getFeedStateSelector,
  (feed) => feed.totalToday
);

export const getErrorSelector = createSelector(
  getFeedStateSelector,
  (feed) => feed.error
);

export const getIsLoadingSelector = createSelector(
  getFeedStateSelector,
  (feed) => feed.isLoading
);

// Экспорт редюсера
export default feedSlice.reducer;
