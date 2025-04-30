import coreClient, {IClient} from "../client/client";
import {genericEventHandler, GenericEventHandler} from "./baseEventHandler";
import {IBaseRequest} from "./baseRequestHandler";

// Define the type for the chainable event handlers
export type EventServiceHandler<T> = {
  onStart: (callback: () => void) => EventServiceHandler<T>;
  onSuccess: (callback: (result: T) => void) => EventServiceHandler<T>;
  onFailure: (callback: (error: any) => void) => EventServiceHandler<T>;
};

export class EventService {
  private readonly client: IClient;
  private readonly eventHandler: GenericEventHandler;

  constructor(coreClient: IClient) {
    this.client = coreClient;
    this.eventHandler = genericEventHandler;
  }

  // Triggering the request and returning a handler object with chainable methods
  triggerRequest<T>(request: IBaseRequest<T>): EventServiceHandler<T> {
    const event = request.request(this.client);
    return this.eventHandler.triggerEvent(event);
  }
}
// Initialize EventService with the client
export const eventService = new EventService(coreClient);
