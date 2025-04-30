import React from "react";
import {
    BUTTON,
    FormButtonPrimary,
    FormButtonProps,
    FormInputProps, FromInputPrimary, INPUT, SUBMIT
} from "../../../../common/templates/input/InputTemplate";
import { PasswordRecoveryTemplateProps} from "../types/PasswordRecoveryTypes";
import Loader from "../../../../common/templates/loading/LoaderTemplate";
import {IconUtils} from "../../../../common/consts/icons";


const PasswordRecoveryPageTemplate: React.FC<PasswordRecoveryTemplateProps> = (props: PasswordRecoveryTemplateProps) => (
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
                    {"Forgot your password?"}
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
                                testId: 'email',
                                name: 'email',
                                label: 'Email',
                                value: props.formik.values.email,
                                isRequired: true,
                                type: INPUT,
                                autoComplete: INPUT
                            } as FormInputProps}
                        />

                        <div>
                            <FormButtonPrimary {...{
                                testId: 'send-passwordRecovery-request',
                                buttonType: SUBMIT,
                                onClick: () => {},
                                hasIcon: false,
                                description: props.loading ? 'Requesting...' : 'Request Recovery',
                                disabled: props.loading
                            } as FormButtonProps} />
                        </div>
                        <div>
                            <FormButtonPrimary {...{
                                testId: 'back-to-login',
                                buttonType: BUTTON,
                                onClick: () => props.goToLogin(),
                                hasIcon: false,
                                description: 'Back to Sign In',
                            } as FormButtonProps} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
);

export default PasswordRecoveryPageTemplate;
