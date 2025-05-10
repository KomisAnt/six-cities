import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Offers } from '../../types/types';

import { fetchFavoriteData, userPostFavoriteData } from '../api-actions';
import { RootState } from '../store';

type InitialState = {
  favoritesOffers: Offers;
  isFavoriteDataFullfilled: boolean;
}

const initialState: InitialState = {
  favoritesOffers: [],
  isFavoriteDataFullfilled: false,
};

export const favoriteOffersSlice = createSlice({
  name: 'favoriteOffers',
  initialState,
  reducers: {
    setFavoriteStatus: (state, action: PayloadAction<boolean>) => {
      state.isFavoriteDataFullfilled = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoriteData.fulfilled, (state, action: PayloadAction<Offers>) => {
      state.favoritesOffers = action.payload;
    });
    builder.addCase(userPostFavoriteData.pending, (state) => {
      state.isFavoriteDataFullfilled = false;
    });
    builder.addCase(userPostFavoriteData.fulfilled, (state) => {
      state.isFavoriteDataFullfilled = true;
    });
  },
});

export const getFavoritesOffers = (state: RootState) => state.favoriteOffers.favoritesOffers;
export const getIsFavoriteDataFullfilled = (state: RootState) => state.favoriteOffers.isFavoriteDataFullfilled;

export const { setFavoriteStatus } = favoriteOffersSlice.actions;
export default favoriteOffersSlice.reducer;
