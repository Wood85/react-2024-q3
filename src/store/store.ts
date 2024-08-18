import { configureStore } from '@reduxjs/toolkit';
import formReducer from './reducers/formSlice';
import countriesSlice from './reducers/countriesSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    countries: countriesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
