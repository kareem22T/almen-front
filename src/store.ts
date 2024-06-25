import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import homeReducer from './features/homeSlice';
import categoryReducer from './features/categorySlice';
import eventReducer from './features/eventSlice';
import settingReducer from './features/settingSlice';
import locationReducer from './features/locationSlice';
import serviceReducer from './features/serviceSlice';

const rootReducer = combineReducers({
  home: homeReducer, 
  categories: categoryReducer, 
  events: eventReducer, 
  settings: settingReducer, 
  locations: locationReducer, 
  services: serviceReducer, 
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["settings"], // Persist only the auth slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store }; // Ensure the store is exported correctly
export default store;
