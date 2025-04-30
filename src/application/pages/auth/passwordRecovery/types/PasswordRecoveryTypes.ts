import {BaseFormPropTypes} from "../../../../common/types/propTypes";
import {BaseState} from "../../../../common/types/stateTypes";

export interface PasswordRecoveryState extends BaseState{}

export interface PasswordRecoveryTemplateProps extends BaseFormPropTypes {
    allRightsReserved?: string | undefined;
    goToLogin: () => void;
}
