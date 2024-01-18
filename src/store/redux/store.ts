'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook
} from 'react-redux';
import soundSlice from './features/sound';
import userSlice from './features/user-data/user-slice';

const reducers = combineReducers({
  user: userSlice,
  soundSlice
});

export const store = configureStore({
  reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
