import {BaseEmailType} from "../baseTypes";

export type UserAuth  = {
    email: string
    phoneNumber: string;
    name: string;
}

export type LoginResponse = {
    authToken: string,
    expiration: string;
    nextStep2FA: boolean;
    accessToken: string;
    verified: boolean;
    user?: UserAuth
}





export type MfaRequestType = {
    token: string;
    code: string;
}


