import { createAsyncThunk } from '@reduxjs/toolkit';

import { saveToken, dropToken } from '../services/token';

import { APIRoute } from '../const';

import { RootState } from './store';
import { Offers, RoomOffer, UserLoginStatusData, AuthData, CommentPostData, RoomComments, FavoritePostData } from '../types/types';

import { AxiosInstance } from 'axios';

const FetchActions = {
  SET_SITY: 'city/set',
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  FETCH_NEARBY_OFFERS: 'offers/fetch-neraby',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
  SET_SORTING: 'sorting/set',
  USER_LOGIN: 'user/login',
  USER_LOGOUT: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  FETCH_FAVORITE: 'offers/favorites',
  POST_FAVORITE: 'offer/post-favorite',
};

export const fetchOffersData = createAsyncThunk<Offers, undefined, {
  state: RootState;
  extra: AxiosInstance;
}>(
  FetchActions.FETCH_OFFERS,
  async (_, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchHotelPropertyData = createAsyncThunk<RoomOffer, number, {
  state: RootState;
  extra: AxiosInstance;
}>(
  FetchActions.FETCH_OFFER,
  async (id, { extra: api }) => {
    const { data } = await api.get<RoomOffer>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchNearbyOffersData = createAsyncThunk<Offers, number, {
  state: RootState;
  extra: AxiosInstance;
}>(
  FetchActions.FETCH_NEARBY_OFFERS,
  async (id, { extra: api }) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchUserStatusData = createAsyncThunk<UserLoginStatusData, undefined, {
  state: RootState;
  extra: AxiosInstance;
}>(
  FetchActions.FETCH_USER_STATUS,
  async (_, { extra: api }) => {
    const { data } = await api.get<UserLoginStatusData>(`${APIRoute.Login}`);
    return data;
  },
);

export const fetchRoomComments = createAsyncThunk<RoomComments, number, {
  state: RootState;
  extra: AxiosInstance;
}>(
  FetchActions.FETCH_COMMENTS,
  async (id: number, { extra: api }) => {
    const { data } = await api.get<RoomComments>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const userLogin = createAsyncThunk<void, AuthData, {
  state: RootState;
  extra: AxiosInstance;
}>(
  FetchActions.USER_LOGIN,
  async ({ login: email, password }, { extra: api }) => {
    const { data: { token } } = await api.post<UserLoginStatusData>(APIRoute.Login, { email, password });
    saveToken(token);
  },
);

export const userLogout = createAsyncThunk<void, undefined, {
  state: RootState;
  extra: AxiosInstance;
}>(
  FetchActions.USER_LOGOUT,
  async (_, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const userPostComment = createAsyncThunk<RoomComments, CommentPostData, {
  state: RootState;
  extra: AxiosInstance;
}>(
  FetchActions.POST_COMMENT,
  async ({ id, comment, rating }, { extra: api }) => {
    const { data } = await api.post<RoomComments>(`${APIRoute.Comments}/${id}`, { comment, rating });
    return data;
  }
);

export const fetchFavoriteData = createAsyncThunk<Offers, undefined, {
  state: RootState;
  extra: AxiosInstance;
}>(
  FetchActions.FETCH_FAVORITE,
  async (_, { extra: api }) => {
    const { data } = await api.get<Offers>(APIRoute.Favotires);
    return data;
  },
);

export const userPostFavoriteData = createAsyncThunk<Offers, FavoritePostData, {
  state: RootState;
  extra: AxiosInstance;
}>(
  FetchActions.POST_FAVORITE,
  async ({ id, status }, { extra: api }) => {
    const { data } = await api.post<Offers>(`${APIRoute.Favotires}/${id}/${status}`, { id, status });
    return data;
  }
);
