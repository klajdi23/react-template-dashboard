# react-template-dashboard# 🌀 Event Handling Pattern for Async Requests

This project implements a **clean and reusable pattern** for handling asynchronous requests and events in a ReactJS app (or TypeScript-based front-end/backend setup). It separates the concerns of request logic, event management, and lifecycle callbacks.

---

## 📐 Pattern Overview

The structure consists of three core components:

1. **IBaseRequest<T>** – Abstraction for asynchronous requests.
2. **GenericEventHandler** – Lifecycle-aware event handler with structured callbacks.
3. **EventService** – Orchestrator that binds requests with event handlers in a chainable way.

---

## 🧱 Pattern Breakdown

### 🔹 `IBaseRequest<T>`

- An interface that defines the shape of any async request.
- Uses generics to define the expected response type (`T`).
- The `request(client)` method must be implemented and will use a provided `ICoreClient` for performing the operation (e.g., an HTTP request).

#### ✅ Example:
```ts
class FetchExampleData implements IBaseRequest<Post[]> {
  async request(client: ICoreClient): Promise<Post[]> {
    return await client.get("/posts");
  }
}
