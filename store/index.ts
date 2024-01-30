import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { setupListeners } from "@reduxjs/toolkit/query"




export const store = configureStore({
  reducer: rootReducer, 
	devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false})
});

setupListeners(store.dispatch);