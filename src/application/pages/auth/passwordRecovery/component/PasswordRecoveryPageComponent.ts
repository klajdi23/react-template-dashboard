import * as Yup from "yup";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../core/store/store";
import {eventService} from "../../../../../core/eventHandler/eventServiceHandler";
import {useFormik} from "formik";
import {allRightsReserved} from "../../../../common/consts/texts";
import PasswordRecoveryTemplate from "./PasswordRecoveryPageTemplate";
import {PasswordRecoveryTemplateProps} from "../types/PasswordRecoveryTypes";
import {
    passwordRecoveryClear,
    passwordRecoveryFailure,
    passwordRecoveryStart,
    passwordRecoverySuccess
} from "../passwordRecoverySlice";
import {PasswordRecoveryRequest} from "../service/passwordRecoveryService";
import {useNavigate} from "react-router";
import {RoutePaths} from "../../../../common/routes/routePaths";
import AuthSuccessTemplate from "../../authSuccess/component/AuthSuccessTemplate";
import {AuthSuccessTypes} from "../../authSuccess/types/authSuccessTypes";

const PasswordRecoveryFormSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
});

const PasswordRecoveryPageComponent: React.FC = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state: RootState) => state.passwordRecovery);

    const handleSubmit = async (values: any) => {
        try {
            dispatch(passwordRecoveryStart())

            eventService
                .triggerRequest(new PasswordRecoveryRequest({
                    email: values.email
                }))
                .onStart(() => {
                    dispatch(passwordRecoveryStart())
                })
                .onSuccess(() => {
                    dispatch(passwordRecoverySuccess());
                })
                .onFailure((err) => {
                    dispatch(passwordRecoveryFailure(err.message));
                });

        } catch (error) {
            dispatch(passwordRecoveryFailure(error instanceof Error ? error.message : 'Recovery failed'));
        }
    };

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: values => handleSubmit(values),
        validationSchema: PasswordRecoveryFormSchema,
    });

    const goToLogin = () => {
        dispatch(passwordRecoveryClear());
        navigate(RoutePaths.LOGIN_PATH);
    }

    const props: PasswordRecoveryTemplateProps = {
        allRightsReserved: allRightsReserved(),
        formik,
        error: error as string,
        loading,
        goToLogin,
    };

    const successProps : AuthSuccessTypes = {
        title: 'Password recovery email sent',
        description: 'Your password recovery email has already been sent.',
        goToLogin,
        loading,
        error: error as string,
        allRightsReserved: allRightsReserved()
    };

    return success ? AuthSuccessTemplate(successProps) : PasswordRecoveryTemplate(props);
}

export default PasswordRecoveryPageComponent;
