import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './reducers/charactersSlice';
import infoReducer from './reducers/infoSlice';
import selectedCharacters from './reducers/selectedCharactersSlice';
import { swApi } from './../services/SWAPI/SWAPI';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    info: infoReducer,
    selected: selectedCharacters,
    [swApi.reducerPath]: swApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
