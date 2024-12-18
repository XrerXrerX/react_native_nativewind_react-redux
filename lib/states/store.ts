/** @format */

// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authUser/reducer"; // Ensure correct import

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // Use this type for dispatch
