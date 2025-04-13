import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import rootReducer from './rootReducer';

// Создание Redux store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

// Типизация состояния и диспетчера
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Кастомные хуки с типизацией
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
