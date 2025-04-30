export interface BasePropTypes {
    loading: boolean;
    error: string | undefined;
}

export interface BaseFormPropTypes extends BasePropTypes {
    formik?: any | undefined;
}
