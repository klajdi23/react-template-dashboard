import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import LoginPageTemplate from "./LoginPageTemplate";
import LoginPageMfaTemplate from "./LoginPageMfaTemplate";
import { allRightsReserved } from "../../../../common/consts/texts";
import {loginStart, loginSuccess, loginFailure, mfaStepSuccess, clearLogin} from "../loginSlice";
import { RootState } from "../../../../../core/store/store";
import { LoginPageTemplateProps } from "../types/LoginTypes";
import { eventService } from "../../../../../core/eventHandler/eventServiceHandler";
import {LoginRequest, MfaLoginRequest} from "../services/loginService";
import {useNavigate} from "react-router";
import {RoutePaths} from "../../../../common/routes/routePaths";

const LoginFormSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
});

const MfaFormSchema = Yup.object().shape({
    code: Yup.string()
        .required('Required')
});

const LoginPageComponent: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, mfaData} = useSelector((state: RootState) => state.login);

    const handleLoginSubmit = async (values: any) => {
        try {
            dispatch(loginStart());

            eventService
                .triggerRequest(new LoginRequest({
                    email: values.email,
                    password: values.password,
                }))
                .onStart(() => {
                    dispatch(loginStart())
                })
                .onSuccess((res) => {
                    dispatch(mfaStepSuccess(res));
                })
                .onFailure((err) => {
                    dispatch(loginFailure(err.data.Message));
                });

        } catch (error) {
            dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
        }
    };

    const handleMfaSubmit = async (values: any) => {
        try {
            dispatch(loginStart());

            eventService
                .triggerRequest(new MfaLoginRequest({
                    code: values.code,
                    token: mfaData?.authToken ?? "",
                }))
                .onStart(() => {
                    dispatch(loginStart())
                })
                .onSuccess((res) => {
                    dispatch(loginSuccess(res));
                    navigate(RoutePaths.HOME);
                })
                .onFailure((err) => {
                    dispatch(loginFailure(err.data.Message));
                });

        } catch (error) {
            dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
        }
    };


    const authFormik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => handleLoginSubmit(values),
        validationSchema: LoginFormSchema
    });

    const mfaFormik = useFormik({
        initialValues: {
            code: '',
        },
        onSubmit: values => handleMfaSubmit(values),
        validationSchema: MfaFormSchema
    });

    const goToPasswordRecovery = () => {
        navigate(RoutePaths.PASSWORD_RECOVERY_PATH);
    }

    const authProps: LoginPageTemplateProps = {
        allRightsReserved: allRightsReserved(),
        formik: mfaData ? mfaFormik : authFormik,
        goToPasswordRecovery,
        error: error as string,
        loading: loading,
        clearLogin: () => dispatch(clearLogin())
    };

    return mfaData ? LoginPageMfaTemplate(authProps) : LoginPageTemplate(authProps);
}

export default LoginPageComponent;
