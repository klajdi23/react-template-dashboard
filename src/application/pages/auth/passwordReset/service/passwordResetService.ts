import {IBaseRequest} from "../../../../../core/eventHandler/baseRequestHandler";
import {IClient} from "../../../../../core/client/client";
import {BaseResponse} from "../../../../common/types/baseTypes";
import {PasswordResetRequestModel} from "../types/PasswordResetTypes";

export class PasswordResetRequest implements IBaseRequest<BaseResponse> {
    public  newPassword : string;
    public  confirmPassword : string;
    public  token : string;

    constructor(model: PasswordResetRequestModel) {
        this.newPassword = model.password;
        this.confirmPassword = model.confirmPassword;
        this.token = model.token;
    }
    request(client: IClient): Promise<BaseResponse> {
        return client.post("/api/Admin/AdminAuthentication/reset-password", { ...this});
    }
}
