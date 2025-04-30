import React from "react";
import Loader from "../../../../common/templates/loading/LoaderTemplate";
import {
    BUTTON, FormButtonPrimary, FormButtonProps
} from "../../../../common/templates/input/InputTemplate";
import {AuthSuccessTypes} from "../types/authSuccessTypes";
import {IconUtils} from "../../../../common/consts/icons";

const AuthSuccessTemplate: React.FC<AuthSuccessTypes>  = (props: AuthSuccessTypes) => {
    return (
        <>
            <div className="flex flex-col flex-grow min-h-full pt-auto pb-auto items-center bg-gray-100 lg:p-12 md:p-6 sm:p-6 xs:p-6">
                <Loader loading={props.loading}/>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        alt=""
                        src={IconUtils.baseLogo}
                        className="mx-auto h-10 w-auto"
                    />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white px-6 py-12 shadow-sm sm:rounded-lg sm:px-12 flex flex-grow flex-col">
                        <div className="space-y-6 text-center place-content-center inline-flex flex-col flex-grow flex-shrink-0 items-center">
                            {props.error && (
                                <div className="text-red-500 text-sm mb-4">
                                    {props.error}
                                </div>
                            )}

                            <div>
                                <img src={IconUtils.greenTick} alt="Success" />
                            </div>

                            <div className="w-md-mobile text-center justify-center text-neutral-800 text-xl font-semibold  leading-7">{props.title}</div>

                            <div className="w-md-mobile text-center justify-center text-primaryGs text-sm font-normal leading-snug">{props.description}</div>

                            <div className="min-w-full">
                                <FormButtonPrimary {...{
                                    testId: 'sign-in',
                                    buttonType: BUTTON,
                                    onClick: () => props.goToLogin(),
                                    hasIcon: false,
                                    description: props.loading ? 'Signing in...' : 'Sign in',
                                    disabled: props.loading
                                } as FormButtonProps} />
                            </div>
                        </div>

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
    )
}

export default AuthSuccessTemplate;
