import React, { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { DatePickerTemplate } from '../datepicker/DatePickerTemplate';
import { dateFormatter } from '../../dateTimeFormater';
import { onBlurMoneyType, onFocusMoneyType } from '../../utils';
import { LockClosedIcon } from "@heroicons/react/24/solid";
import TooltipTemplate from "../tooltip/TooltipTemplate";

export const SUBMIT = "submit";
export const BUTTON = "button";
export const INPUT = "text";
export const NUMBER = "number";
export const EMAIL = "email";
export const PASSWORD = "password";
export const CURRENT_PASSWORD = "current-password"
export const DATE = "date";
export const MONEY = "money";

abstract class FormBaseProps {
    public testId?: string = ''
}

export class FormButtonProps extends FormBaseProps {
    public onClick?: Function = () => {
    }
    public hasIcon: boolean = false;
    public disabled?: boolean = false;
    public disabledTheme?: boolean = false;
    public description: string = '';
    public className?: string = '';
    public buttonType: typeof BUTTON | typeof SUBMIT = BUTTON
}

export type FormCheckboxProps  = {
     id: string;
     label: string;
     checked?: boolean;
     onChange?:  () => void;
}

export class FormInputProps extends FormBaseProps {
    public value: string | number | Date = ''
    public label?: string = ''
    public type?: typeof INPUT | typeof EMAIL | typeof PASSWORD | typeof DATE | typeof NUMBER | typeof MONEY = INPUT
    public name: string = '';
    public className?: string = '';
    public onChange: any;
    public placeholder?: string = '';
    public autoComplete?: typeof INPUT
        | typeof EMAIL
        | typeof PASSWORD
        | typeof CURRENT_PASSWORD
        | typeof DATE
        | typeof NUMBER
    public isRequired?: boolean = false;
    public isReadonly?: boolean = false

    public hasValidationError?: boolean = false;
    public validationMessage?: string = '';
}

export const FormButtonPrimary: React.FC<FormButtonProps> = (props: FormButtonProps) => (
<button
    data-testid={`form-button-primary-${props.testId}`}
    type={props.buttonType}
    disabled={props.disabled}
    onClick={() => props.onClick && props.onClick()}
    className={`${props.hasIcon ? 'group relative' : ''}
    ${props.className ? `${props.className}`
        : `w-full
        cursor-pointer
    flex
    justify-center
    py-2 px-4
    border
    border-transparent
    text-sm
    font-medium
    rounded-md
    text-white
    ${(props.disabled || props.disabledTheme) ? `
    bg-gray-500
    hover:bg-gray-400
    focus:ring-gray-400 ` : ` bg-primary 
    hover:bg-primaryDark
    focus:ring-primaryHover`}

    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
   `}`}>
    {
        props.hasIcon ?
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LockClosedIcon className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
        </span> : null
    }
    {props.description}
</button>);

export const FromInputPrimary: React.FC<FormInputProps> = (props: FormInputProps) => {
    const [isDatepickerShown, setIsDatepickerShown] = useState<boolean>(false);


    return (
        <>
            <div
                className='relative'
                onFocus={() => props.type === DATE && setIsDatepickerShown(true)}
                onBlur={() => props.type === DATE && setIsDatepickerShown(false)}
            >
                {props.label &&
                    <label data-testid={`form-input-label-${props.testId}`} htmlFor={props.type} className=" block text-sm font-medium text-gray-700">
                        {props.label}
                    </label>
                }
                <div className="mt-1 relative">
                    <input
                        id={props.name}
                        name={props.name}
                        placeholder={props.placeholder}
                        onChange={e => props.onChange(e)}
                        type={!props.type || props.type === DATE ? INPUT : props.type === MONEY ? INPUT : props.type}
                        value={props.type === DATE ? dateFormatter(props.value as Date) : (props.type == MONEY ? props.value as string : props.value as string | number)}
                        autoComplete={props.autoComplete}
                        required={props.isRequired}
                        onFocus={(e) => {
                            if (props.type == MONEY) {
                                e.target.value = onFocusMoneyType(e.target.value)
                            }
                        }}
                        onBlur={(e) => {
                            if (props.type == MONEY) {
                                e.target.value = onBlurMoneyType(e.target.value)
                            }
                        }}
                        readOnly={props.type === DATE || props.isReadonly}
                        data-testid={`form-input-primary-${props.testId}`}
                        className={`appearance-none
                                    block
                                    w-full
                                    px-3
                                    py-2
                                    border
                                    border-gray-300
                                    rounded-md
                                    shadow-sm
                                    placeholder-gray-400
                                    focus:outline-none
                                    focus:ring-primaryHover
                                    focus:border-primaryHover
                                    sm:text-smaller
                    ${props.hasValidationError ? '!border-red-600 !focus:ring-red-700 !focus:border-red-700' : ''}
                    ${isDatepickerShown ? 'rounded-br-none rounded-bl-none' : ''} ${props.className ?? ''}`}
                    />
                    {/* {props.type === MONEY &&
                        <div className="pointer-events-none absolute top-[55%] right-0 flex items-center pr-3">
                            <span className="text-gray-500 sm:text-sm" id="price-currency">
                                USD
                            </span>
                        </div>
                    } */}
                    <TooltipTemplate isVisible={false} title={''} list={[]}/>
                </div>
                <Transition
                    as={Fragment}
                    show={isDatepickerShown}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                >
                    <div
                        className='absolute origin-top-right mt-[1px] right-0 w-full rounded-br-md rounded-bl-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[1]'>
                        <DatePickerTemplate
                            className='p-3'
                            value={props.value as Date}
                            onChange={(selectedDate: Date) => {
                                props.onChange({ target: { name: props.name, value: selectedDate } });
                                setIsDatepickerShown(false);
                            }}
                        />
                    </div>
                </Transition>

                {props.hasValidationError && props.validationMessage &&
                    <p className={`    block
                w-full text-sm text-red-600 overflow-hidden text-ellipsis whitespace-nowrap ${props.hasValidationError
                        ? ''
                        : 'invisible'
                    }`}
                    >
                        {props.validationMessage}
                    </p>

                }
            </div>

        </>
    );
}

export const FormInputCommon: React.FC<FormInputProps> = (props: FormInputProps) => {
    return (
        <div
            className="
                sm:grid
                sm:grid-cols-3
                sm:gap-4
                sm:items-start
                sm:pt-5
                mt-5">

            <label htmlFor="first-name"
                   data-testid="ca-legalFirstName-label-testId"
                   className="block
                               text-sm
                               font-medium
                               text-gray-700
                               sm:mt-px
                               sm:pt-2">
                {props.label}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                    data-testid={`form-input-primary-${props.testId}`}
                    type={props.type}
                    name={props.name}
                    id={props.placeholder}
                    placeholder={props.placeholder}
                    autoComplete="given-name"
                    value={props.value as string}
                    onChange={e => props.onChange(e)}
                    className={`max-w-lg
                            block w-full
                            shadow-sm
                            sm:max-w-xs
                            sm:text-sm
                            border-gray-300
                            rounded-md
                            ${props.hasValidationError ? '!border-red-600 !focus:ring-red-700 !focus:border-red-700' : 'focus:ring-primaryHover focus:border-primaryHover '}`}
                />
                {props.hasValidationError && props.validationMessage &&
                    <p
                        className={`
                        lg:w-full md:w-full
                        sm:w-9/12
                        text-sm
                        text-red-600
                        h-[20px]
                        overflow-hidden
                        text-ellipsis
                        whitespace-nowrap ${props.hasValidationError ? '' : 'invisible'}
                        `}
                    >
                        {props.validationMessage}
                    </p>
                }
            </div>
        </div>);
}

export const FormCheckboxPrimary: React.FC<FormCheckboxProps> = (props: FormCheckboxProps) => (
    <div className="flex items-center">
        <input
            id={props.id}
            name={props.id}
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primaryHover border-gray-300 rounded cursor-pointer hover:ring-primaryHover"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            {props.label}
        </label>
    </div>
);
