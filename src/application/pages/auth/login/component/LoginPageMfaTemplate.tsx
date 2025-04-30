import React from 'react';

import {
    BUTTON,
    FormButtonPrimary,
    FormButtonProps,
    FormCheckboxPrimary,
    FormCheckboxProps, FormInputProps, FromInputPrimary, INPUT, NUMBER, SUBMIT
} from "../../../../common/templates/input/InputTemplate";
import { LoginPageTemplateProps } from "../types/LoginTypes";
import {RoutePaths} from "../../../../common/routes/routePaths";
import Loader from "../../../../common/templates/loading/LoaderTemplate";
import {IconUtils} from "../../../../common/consts/icons";


const LoginPageMfaTemplate: React.FC<LoginPageTemplateProps> = (props: LoginPageTemplateProps) => (
    <>
        <div className="flex flex-col flex-grow min-h-full pt-auto pb-auto items-center bg-gray-100 lg:p-12 md:p-6 sm:p-6 xs:p-6">

            <Loader loading={props.loading}/>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    alt=""
                    src={IconUtils.baseLogo}
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    {"Sign in to your account"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12">
                    <form onSubmit={props.formik.handleSubmit} className="space-y-6">
                        {props.error && (
                            <div className="text-red-500 text-sm mb-4">
                                {props.error}
                            </div>
                        )}
                        <FromInputPrimary
                            {...{
                                hasValidationError: props.formik?.errors?.email && props.formik?.touched?.email,
                                validationMessage: props.formik?.errors?.email,
                                onChange: props.formik.handleChange,
                                testId: 'code',
                                name: 'code',
                                label: 'Authentication Code',
                                value: props.formik.values.email,
                                isRequired: true,
                                type: NUMBER,
                                autoComplete: INPUT
                            } as FormInputProps}
                        />

                        <div>
                            <FormButtonPrimary {...{
                                testId: 'authenticate',
                                buttonType: SUBMIT,
                                onClick: () => {
                                },
                                hasIcon: false,
                                description: props.loading ? 'Authenticating...' : 'Authenticate',
                                disabled: props.loading
                            } as FormButtonProps} />
                        </div>

                        <div>
                            <FormButtonPrimary {...{
                                testId: 'authenticate',
                                buttonType: BUTTON,
                                onClick: () => {
                                    props.clearLogin();
                                },
                                hasIcon: false,
                                description: props.loading ? 'Redirecting...' : 'Back To Login',
                                disabled: props.loading
                            } as FormButtonProps} />
                        </div>
                    </form>

                    <div>
                        <div className="relative mt-6">
                            <div aria-hidden="true" className="text-gray-500 absolute inset-0 flex items-center justify-center text-">
                                {props.allRightsReserved}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
);

export default LoginPageMfaTemplate;
