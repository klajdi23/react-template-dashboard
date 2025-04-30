import * as Yup from "yup";
import YupPassword from 'yup-password'
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../core/store/store";
import {eventService} from "../../../../../core/eventHandler/eventServiceHandler";
import {useFormik} from "formik";
import {allRightsReserved} from "../../../../common/consts/texts";
import PasswordResetTemplate from "./PasswordResetPageTemplate";
import {PasswordResetTemplateProps} from "../types/PasswordResetTypes";
import {passwordResetFailure, passwordResetStart, passwordResetSuccess} from "../passwordResetSlice";
import {PasswordResetRequest} from "../service/passwordResetService";
import {useNavigate, useParams} from "react-router";
import {RoutePaths} from "../../../../common/routes/routePaths";
import {AuthSuccessTypes} from "../../authSuccess/types/authSuccessTypes";
import AuthSuccessTemplate from "../../authSuccess/component/AuthSuccessTemplate";

YupPassword(Yup);

const PasswordResetFormSchema = Yup.object().shape({
    password: Yup.string()
        .min(8)
        .minLowercase(1, 'Password should contain at least 1 lowercase character.')
        .minUppercase(1, 'Password should contain at least 1 uppercase character.')
        .minNumbers(1, 'Password should contain at least 1 number')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

const PasswordResetPageComponent: React.FC = () => {
    const dispatch = useDispatch();

    const {token} = useParams();


    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state: RootState) => state.passwordReset);


    const handleSubmit = async (values: any) => {
        try {
            eventService
                .triggerRequest(new PasswordResetRequest({
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    token: token as string,
                }))
                .onStart(() => {
                    dispatch(passwordResetStart())
                })
                .onSuccess(() => {
                    dispatch(passwordResetSuccess());
                })
                .onFailure((err) => {
                    dispatch(passwordResetFailure(err.message));
                });

        } catch (error) {
            dispatch(passwordResetFailure(error instanceof Error ? error.message : 'Reset failed'));
        }
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        onSubmit: values => handleSubmit(values),
        validationSchema: PasswordResetFormSchema,
    });

    const props: PasswordResetTemplateProps = {
        allRightsReserved: allRightsReserved(),
        formik,
        error: error as string,
        loading: loading,
        goToLogin: () => navigate(RoutePaths.LOGIN_PATH)
    };

    const successProps : AuthSuccessTypes = {
        title: 'Password is reset',
        description: 'Your password has been successfully reset.',
        goToLogin: () => navigate(RoutePaths.LOGIN_PATH),
        loading: loading,
        error: error as string,
        allRightsReserved: allRightsReserved()
    };

    return success ? AuthSuccessTemplate(successProps) : PasswordResetTemplate(props);
}

export default PasswordResetPageComponent;
