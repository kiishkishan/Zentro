# Zentro App Documentation

 🛠️ Project Setup Guide

## Clone the Repository

```bash
git clone <repository-url>
cd zentro
```

## Switch to Main Branch

```bash
git checkout main
```

## Install Dependencies

```bash
npm install
```

For iOS:

```bash
cd ios && pod install && cd ..
```

## Run the App

Android:

```bash
npm run android
```

iOS:

```bash
npm run ios
```

---

## 🧠 Architecture Overview

This project follows a clean, scalable React Native architecture with a strong separation of concerns and type‑safety.

```
src
 ├── api           # axios client & API handlers
 ├── assets        # images/fonts
 ├── components    # reusable UI components
 ├── context       # context / providers for Cart
 ├── navigations   # navigation + type‑safe routes
 ├── screens       # screen UI
 ├── store         # Redux Toolkit slices + thunks
 ├── theme         # typography, colors
 ├── types         # app‑wide TS types
 └── utils         # helper functions (ex: filterProducts)
```

---

## 🔗 Data Flow (API → Store → UI)

```
axiosClient.ts → products.ts (API functions) → thunk → slice → UI
```

### axiosClient.ts

* Base axios instance (interceptors)
* Handles headers & future auth tokens
* Centralized config

### products.ts (API Layer)

Defines reusable API functions:

```ts
export const fetchProductsApi = (offset, limit) =>
  axiosClient.get(`/products?offset=${offset}&limit=${limit}`);
```

### Thunk

* Calls API
* Handles async success/error
* Stores data in Redux

### UI

* Selects data from Redux
* Displays products

---

### 🧽 Why Filter Product Data?

To avoid rendering broken products from Platzi fakeapi store

* Missing `image`
* Empty name
* Invalid pricing fields

Ensures clean UI & avoids crashes.

---

### 🧭 Type‑Safe Navigation

Implemented `@react-navigation` with TypeScript route types:

* Each stack has defined route params
* Navigations always receive typed arguments
* Prevents wrong screen param usage

Example:

```ts
export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { id: number };
};
```

---

### ♾️ Infinite Scroll Implementation

* Used `FlatList`
* `onEndReached` triggers new fetch
* Offset + limit used for pagination
* Store appends results instead of replacing

Pseudo flow:

```
onEndReached -> dispatch thunk -> fetch next set -> append to state
```

Ensures seamless scrolling without duplicate loads.

## 🧰 Tech Stack

 This project uses a modern, scalable, and performant tech stack:

Frontend Framework

React Native — cross‑platform mobile development

### Language

TypeScript — end‑to‑end type‑safety for maintainability and robust code

### State Management

Redux Toolkit — optimized global state management

RTK Thunk — handles async API calls

Redux Persist — persists store data across sessions

### Networking

Axios — HTTP client with centralized instance (axiosClient.ts)

### Navigation

React Navigation — full navigation system (stack + tabs)

Strong TypeScript route definitions
