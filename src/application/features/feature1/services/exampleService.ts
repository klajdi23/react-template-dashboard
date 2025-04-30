import { IClient } from "../../../../core/client/client";
import { IBaseRequest } from "../../../../core/eventHandler/baseRequestHandler";
import { Example } from "../types/ExampleType";

// service
export class FetchExampleData implements IBaseRequest<Array<Example>> {
  request(client: IClient): Promise<Example[]> {
    return client.get<Array<Example>>("/posts");
  }
}
