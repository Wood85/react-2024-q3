import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPeople } from './../../interfaces/interfaces';

export interface IState {
  selected: IPeople[];
}

const initialState: IState = { selected: [] };

export const selectedCharactersSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    arrOfSelected: (state, action: PayloadAction<IPeople[]>) => {
      state.selected = action.payload;
    },
  },
});

export const { arrOfSelected } = selectedCharactersSlice.actions;

export default selectedCharactersSlice.reducer;
