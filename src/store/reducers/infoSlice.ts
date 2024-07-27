import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from './../../interfaces/interfaces';
import { emptyCharacter } from './../../utils/constants';

const initialState: { data: IPeople; isShow: boolean; loadingInfo: boolean } = {
  data: emptyCharacter,
  isShow: false,
  loadingInfo: false,
};

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setCurrentInfo: (state, action: PayloadAction<IPeople>) => {
      state.data.birth_year = action.payload.birth_year;
      state.data.eye_color = action.payload.eye_color;
      state.data.films = action.payload.films;
      state.data.gender = action.payload.gender;
      state.data.hair_color = action.payload.hair_color;
      state.data.height = action.payload.height;
      state.data.homeworld = action.payload.homeworld;
      state.data.mass = action.payload.mass;
      state.data.name = action.payload.name;
      state.data.skin_color = action.payload.skin_color;
      state.data.created = action.payload.created;
      state.data.edited = action.payload.edited;
      state.data.species = action.payload.species;
      state.data.starships = action.payload.starships;
      state.data.url = action.payload.url;
      state.data.vehicles = action.payload.vehicles;
    },
    showInfo: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload;
    },
    loadingInfo: (state, action: PayloadAction<boolean>) => {
      state.loadingInfo = action.payload;
    },
  },
});

export const { setCurrentInfo, showInfo, loadingInfo } = infoSlice.actions;

export default infoSlice.reducer;
