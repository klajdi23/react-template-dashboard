import React from "react";
import {
    CURRENT_PASSWORD,
    FormButtonPrimary,
    FormButtonProps, FormInputProps, FromInputPrimary, PASSWORD, SUBMIT
} from "../../../../common/templates/input/InputTemplate";
import { PasswordResetTemplateProps } from "../types/PasswordResetTypes";
import Loader from "../../../../common/templates/loading/LoaderTemplate";
import {IconUtils} from "../../../../common/consts/icons";


const PasswordResetPageTemplate: React.FC<PasswordResetTemplateProps> = (props: PasswordResetTemplateProps) => (
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
                                hasValidationError: props.formik?.errors?.password && props.formik?.touched?.password,
                                validationMessage: props.formik?.errors?.password,
                                onChange: props.formik.handleChange,
                                testId: 'password',
                                name: 'password',
                                label: 'New Password',
                                value: props.formik.values.password,
                                isRequired: true,
                                type: PASSWORD,
                                autoComplete: PASSWORD
                            } as FormInputProps}
                        />

                        <FromInputPrimary
                            {...{
                                hasValidationError: props.formik?.errors?.confirmPassword && props.formik?.touched?.confirmPassword,
                                validationMessage: props.formik?.errors?.confirmPassword,
                                onChange: props.formik.handleChange,
                                testId: 'confirmPassword',
                                name: 'confirmPassword',
                                value: props.formik.values.confirmPassword,
                                label: 'Confirm Password',
                                isRequired: true,
                                type: PASSWORD,
                                autoComplete: CURRENT_PASSWORD
                            } as FormInputProps}
                        />

                        <div className="flex items-center justify-between">
                            <div onClick={() => props.goToLogin()} className="text-sm/6">
                                <p className="font-semibold text-primary600 hover:text-primary800 cursor-pointer">
                                    {"Already know your password?"}
                                </p>
                            </div>
                        </div>

                        <div>
                            <FormButtonPrimary {...{
                                testId: 'sign-in',
                                buttonType: SUBMIT,
                                onClick: () => {},
                                hasIcon: false,
                                description: props.loading ? 'Resetting Password...' : 'Reset Password',
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

export default PasswordResetPageTemplate;
