"use client";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import wrirkbackendReducer from "../features/wrirkBackend/wrirkbackendSlice";
import serviceReducer from "../features/quotaion/serviceSlice";
import crmReducer from "../features/crm/crmSlice";

// APIs
import { quotationApi } from "../services/quotation";
import { wrirkdaApi } from "../services/wrirkda";

/* =======================
   PERSIST CONFIG
======================= */

const crmPersistConfig = {
  key: "crm",
  storage,
  whitelist: ["crmSchlorData", "loginStatus"], // ✅ only needed fields
};

// wrap reducer
const persistedCrmReducer = persistReducer(
  crmPersistConfig,
  crmReducer
);

/* =======================
   STORE
======================= */

export const store = configureStore({
  reducer: {
    [quotationApi.reducerPath]: quotationApi.reducer,
    [wrirkdaApi.reducerPath]: wrirkdaApi.reducer,

    wrirk: wrirkbackendReducer,
    service: serviceReducer,

    // ✅ persisted reducer
    crm: persistedCrmReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚠️ required for redux-persist
    }).concat(quotationApi.middleware, wrirkdaApi.middleware),
});

/* =======================
   PERSISTOR
======================= */

export const persistor = persistStore(store);

// optional but recommended
setupListeners(store.dispatch);