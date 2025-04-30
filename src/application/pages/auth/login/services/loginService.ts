import { LoginResponse, MfaRequestType} from "../../../../common/types/auth/authTypes";
import {IBaseRequest} from "../../../../../core/eventHandler/baseRequestHandler";
import { IClient } from "../../../../../core/client/client";
import {LoginRequestType} from "../types/LoginTypes";

export class LoginRequest implements IBaseRequest<LoginResponse> {
    public  email : string;
    public  password: string;

    constructor(model: LoginRequestType) {
        this.email = model.email;
        this.password = model.password;
    }
    request(client: IClient): Promise<LoginResponse> {
        return client.post("/api/Admin/AdminAuthentication/login", { ...this});
    }
}

export class MfaLoginRequest implements IBaseRequest<LoginResponse> {
    public  code : string;
    public  token: string;

    constructor(model: MfaRequestType) {
        this.code = model.code;
        this.token = model.token;
    }
    request(client: IClient): Promise<LoginResponse> {
        return client.post("/api/Admin/AdminAuthentication/confirm-code", { ...this});
    }
}
