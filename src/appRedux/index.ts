import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

declare global {
  interface Window {
    store: any;
  }
}

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

window.store = store;
