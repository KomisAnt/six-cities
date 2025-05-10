import { configureStore } from '@reduxjs/toolkit';

import offersDataReducer from './slices/offers-data-slice';
import favoriteOffersReducer from './slices/favorite-offers-slice';
import userActionsReducer from './slices/user-actions-slice';

import { createAPI } from '../services/api';
import { useDispatch } from 'react-redux';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    offersData: offersDataReducer,
    favoriteOffers: favoriteOffersReducer,
    userActions: userActionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
