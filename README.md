# react-template-dashboard# 🌀 Event Handling Pattern for Async Requests

This project implements a **clean and reusable pattern** for handling asynchronous requests and events in a ReactJS app (or TypeScript-based front-end/backend setup). It separates the concerns of request logic, event management, and lifecycle callbacks.

---
## Folder Structure
```ts
/src/
│
├── application/
│   ├── hooks.ts           # Typed custom hooks: useAppDispatch, useAppSelector
│   └── store.ts           # Redux store setup and root reducer
│
├── common/
│   ├── consts/            # Global constants
│   ├── routes/            # App route definitions
│   ├── templates/         # Shared UI components (e.g., datepicker, input)
│   ├── types/             # Global types and utilities
│   ├── dateTimeFormater.ts
│   └── utils.ts           # Common utility functions
│
├── features/
│   └── feature1/
│       ├── components/     # Feature-specific UI components
│       ├── hooks/          # Feature-specific hooks
│       ├── services/       # API and business logic
│       ├── types/          # Local types for this feature
│       └── exampleSlice.ts # Redux slice for this feature

---
##  Pattern Overview

The structure consists of three core components:

1. **IBaseRequest<T>** – Abstraction for asynchronous requests.
2. **GenericEventHandler** – Lifecycle-aware event handler with structured callbacks.
3. **EventService** – Orchestrator that binds requests with event handlers in a chainable way.

---

##  Pattern Breakdown

### 🔹 `IBaseRequest<T>`

- An interface that defines the shape of any async request.
- Uses generics to define the expected response type (`T`).
- The `request(client)` method must be implemented and will use a provided `ICoreClient` for performing the operation (e.g., an HTTP request).

####  Example:
```ts
class FetchExampleData implements IBaseRequest<Post[]> {
  async request(client: ICoreClient): Promise<Post[]> {
    return await client.get("/posts");
  }
}
---
## GenericEventHandler
A lifecycle handler with structured async callbacks:

onStart() – Called before request begins

onSuccess(result) – Called when request succeeds

onFailure(error) – Called on error
---
### EventService
A chainable utility to manage requests and lifecycle:
```ts
EventService
  .triggerRequest(new FetchExampleData())
  .onStart(() => console.log('Started'))
  .onSuccess((res) => console.log(res))
  .onFailure((err) => console.error(err));
```
---
### Styling
Styling
Styled using Tailwind CSS, enhanced with:

Tailwind UI – Accessible, pre-styled components

Headless UI – UI primitives with accessibility built-in

Utility-first design – Rapid prototyping with consistent styling

Fully responsive by default 
---

