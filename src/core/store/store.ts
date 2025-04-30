import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from '../../application/features/feature1/exampleSlice';
import loginReducer from "../../application/pages/auth/login/loginSlice";
import passwordRecoveryReducer from "../../application/pages/auth/passwordRecovery/passwordRecoverySlice";
import passwordResetReducer from "../../application/pages/auth/passwordReset/passwordResetSlice";

const store = configureStore({
  reducer: {
    example: exampleReducer,
    login: loginReducer,
    passwordRecovery: passwordRecoveryReducer,
    passwordReset: passwordResetReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
