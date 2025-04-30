import { EventServiceHandler } from "./eventServiceHandler";

// generic event handler with callbacks
export class GenericEventHandler {
    /**
     * Triggers an event with a structured flow: onStart, onSuccess, and onFailure.
     * @param event A promise representing the async event (e.g., an HTTP request).
     * @returns An object with chainable methods for handling event states.
     */
    triggerEvent<T>(event: Promise<T>): EventServiceHandler<T> {
      let onStartCallback: () => void = () => {};
      let onSuccessCallback: (result: T) => void = () =>{};
      let onFailureCallback: (error: any) => void = () =>{};
  
      // Immediately execute the event
      (async () => {
        try {
          // Trigger onStart
          onStartCallback();
          // Wait for the event to resolve
          const result = await event;
          // Trigger onSuccess
          onSuccessCallback(result);
        } catch (error) {
          // Trigger onFailure
          onFailureCallback(error);
        }
      })();
  
      // Return chainable methods of EventServiceHandler
      return {
        onStart(callback: () => void): EventServiceHandler<T> {
          onStartCallback = callback;
          return this; // Return the EventServiceHandler for chaining
        },
        onSuccess(callback: (result: T) => void): EventServiceHandler<T> {
          onSuccessCallback = callback;
          return this; // Return the EventServiceHandler for chaining
        },
        onFailure(
          callback: (error: any) => void): EventServiceHandler<T> {
          onFailureCallback = callback;
          return this; // Return the EventServiceHandler for chaining
        },
      };
    }
  }
  export const genericEventHandler = new GenericEventHandler();