import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {PasswordRecoveryState} from "./types/PasswordRecoveryTypes";

const initialState: PasswordRecoveryState = {
    loading: false,
    error: null,
    success: false
};

const passwordRecoverySlice = createSlice({
    name: 'passwordRecovery',
    initialState,
    reducers: {
        passwordRecoveryStart(state) {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        passwordRecoverySuccess(state) {
            state.loading = false;
            state.success = true;
            state.error = null;
        },
        passwordRecoveryFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        passwordRecoveryClear(state) {
            state.success = false;
            state.error = null;
            state.loading = false;
        }
    },
});

export const { passwordRecoveryStart, passwordRecoverySuccess, passwordRecoveryFailure, passwordRecoveryClear} = passwordRecoverySlice.actions;
export default passwordRecoverySlice.reducer;
