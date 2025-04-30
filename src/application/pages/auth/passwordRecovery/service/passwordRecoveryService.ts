import {IBaseRequest} from "../../../../../core/eventHandler/baseRequestHandler";
import {BaseEmailType} from "../../../../common/types/baseTypes";
import {IClient} from "../../../../../core/client/client";
import {BaseResponse} from "../../../../common/types/baseTypes";

export class PasswordRecoveryRequest implements IBaseRequest<BaseResponse> {
    public  email : string;

    constructor(model: BaseEmailType) {
        this.email = model.email;
    }
    request(client: IClient): Promise<BaseResponse> {
        return client.post("/api/Admin/AdminAuthentication/password-recovery", { ...this});
    }
}
