import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  fetchUserStatusData,
  userLogin,
  userLogout,
} from '../api-actions';

import { AutorizationStatus } from '../../const';
import { RootState } from '../store';
import { UserLoginStatusData } from '../../types/types';

type InitialState = {
  autorizationStatus: AutorizationStatus;
  userLoginStatusData: UserLoginStatusData | null;
}

const initialState: InitialState = {
  autorizationStatus: AutorizationStatus.Unknown,
  userLoginStatusData: null,
};

export const userActionsSlice = createSlice({
  name: 'userActions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state) => {
      state.autorizationStatus = AutorizationStatus.Auth;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.autorizationStatus = AutorizationStatus.NoAuth;
    });
    builder.addCase(userLogout.fulfilled, (state) => {
      state.autorizationStatus = AutorizationStatus.NoAuth;
    });
    builder.addCase(fetchUserStatusData.fulfilled, (state, action: PayloadAction<UserLoginStatusData>) => {
      state.userLoginStatusData = action.payload;
    });
  }
});

export const getAutorizationStatus = (state: RootState) => state.userActions.autorizationStatus;
export const getUserLoginStatusData = (state: RootState) => state.userActions.userLoginStatusData;

export default userActionsSlice.reducer;
