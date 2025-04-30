import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {PasswordResetState} from "./types/PasswordResetTypes";

const initialState: PasswordResetState = {
    loading: false,
    error: null,
    redirect: false,
    success: false,
};

const passwordResetSlice = createSlice({
    name: 'passwordReset',
    initialState,
    reducers: {
        passwordResetStart(state) {
            state.loading = true;
            state.error = null;
        },
        passwordResetSuccess(state) {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        passwordResetFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const { passwordResetStart, passwordResetSuccess, passwordResetFailure, } = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
