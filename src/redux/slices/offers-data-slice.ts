import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  fetchOffersData,
  fetchHotelPropertyData,
  fetchNearbyOffersData,
  fetchRoomComments,
  userPostComment
} from '../api-actions';

import { INIT_CITY, SortFilter } from '../../const';

import { Offers, RoomOffer, City, RoomComments } from '../../types/types';
import { RootState } from '../store';

type InitialState = {
  filterCityName: string;
  offers: Offers;
  roomOffer: RoomOffer | null;
  roomComments: RoomComments;
  nearbyOffers: Offers;
  city: City | null;
  activeOfferCardId: number | null;
  error: string | null;
}

const initialState: InitialState = {
  filterCityName: INIT_CITY,
  offers: [],
  roomOffer: null,
  roomComments: [],
  nearbyOffers: [],
  city: null,
  activeOfferCardId: null,
  error: null,
};

export const offersDataSlice = createSlice({
  name: 'offersData',
  initialState,
  reducers: {
    setActiveOfferCardId: (state, action: PayloadAction<number | null>) => {
      state.activeOfferCardId = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setFilterCityName: (state, action: PayloadAction<string>) => {
      state.filterCityName = action.payload;
    },
    setFilterOption: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case SortFilter.Price_To_Hi: {
          state.offers = state.offers.sort((a, b) => a.price - b.price);
          break;
        }
        case SortFilter.Price_To_Low: {
          state.offers = state.offers.sort((a, b) => b.price - a.price);
          break;
        }
        case SortFilter.Top_Rated: {
          state.offers = state.offers.sort((a, b) => b.rating - a.rating);
          break;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOffersData.fulfilled, (state, action: PayloadAction<Offers>) => {
      state.offers = action.payload.filter((item) => item.city.name === state.filterCityName);
      state.city = state.offers[0].city;
    });
    builder.addCase(fetchHotelPropertyData.fulfilled, (state, action: PayloadAction<RoomOffer>) => {
      state.roomOffer = action.payload;
      state.city = state.roomOffer.city;
    });
    builder.addCase(fetchNearbyOffersData.fulfilled, (state, action: PayloadAction<Offers>) => {
      state.nearbyOffers = action.payload;
    });
    builder.addCase(fetchRoomComments.fulfilled, (state, action: PayloadAction<RoomComments>) => {
      state.roomComments = action.payload;
    });
    builder.addCase(userPostComment.fulfilled, (state, action: PayloadAction<RoomComments>) => {
      state.roomComments = action.payload;
    });
  }
});

export const getFilterCityName = (state: RootState) => state.offersData.filterCityName;
export const getOffers = (state: RootState) => state.offersData.offers;
export const getRoomOffer = (state: RootState) => state.offersData.roomOffer;
export const getRoomComments = (state: RootState) => state.offersData.roomComments;
export const getNearbyOffers = (state: RootState) => state.offersData.nearbyOffers;
export const getCity = (state: RootState) => state.offersData.city;
export const getActiveOfferCardId = (state: RootState) => state.offersData.activeOfferCardId;

export const { setActiveOfferCardId, setFilterCityName, setError, setFilterOption } = offersDataSlice.actions;
export default offersDataSlice.reducer;
