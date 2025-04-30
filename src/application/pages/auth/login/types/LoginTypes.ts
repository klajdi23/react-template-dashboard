import {LoginResponse} from "../../../../common/types/auth/authTypes";
import {BaseFormPropTypes} from "../../../../common/types/propTypes";
import {BaseState} from "../../../../common/types/stateTypes";
import {BaseEmailType} from "../../../../common/types/baseTypes";

export interface LoginState extends BaseState {
    isAuthenticated: boolean;
    loginData?: LoginResponse,
    mfaData?: LoginResponse
}

export interface LoginPageTemplateProps extends BaseFormPropTypes {
    allRightsReserved?: string | undefined;
    goToPasswordRecovery: () => void;
    clearLogin: () => void;
}


export type LoginRequestType = BaseEmailType & {
    password:string;
}
