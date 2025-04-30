import { IClient } from "../client/client";

// base request
export interface IBaseRequest<T> {
    request(client: IClient): Promise<T>;
}
