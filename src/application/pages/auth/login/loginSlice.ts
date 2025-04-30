import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {LoginState} from "./types/LoginTypes";
import {LoginResponse} from "../../../common/types/auth/authTypes";
import {localStore} from "../../../../core/localStorage/localStorage";
import {LocalStoreKeys} from "../../../../core/localStorage/localStorageUtils";

const initialState: LoginState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  loginData: undefined,
  mfaData: undefined,
  success: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<LoginResponse>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
      state.loginData = action.payload;
      state.mfaData = undefined;
      localStore.set(LocalStoreKeys.AUTH_TOKEN, state.loginData.authToken);
    },

    mfaStepSuccess(state, action: PayloadAction<LoginResponse>) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = null;
      state.mfaData = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    clearLogin(state) {
      state.loading = false;
      state.error = '';
      state.mfaData = undefined;
      state.isAuthenticated = false;
      state.loginData = undefined;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, mfaStepSuccess, clearLogin } = loginSlice.actions;
export default loginSlice.reducer;
