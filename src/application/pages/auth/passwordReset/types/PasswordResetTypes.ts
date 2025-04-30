import {BaseFormPropTypes} from "../../../../common/types/propTypes";
import {BaseState} from "../../../../common/types/stateTypes";

export interface PasswordResetState extends BaseState{
    redirect: boolean;
}

export interface PasswordResetTemplateProps extends BaseFormPropTypes {
    allRightsReserved?: string | undefined;
    goToLogin: () => void;
}

export type PasswordResetRequestModel = {
    password:string;
    confirmPassword:string;
    token:string;
}

