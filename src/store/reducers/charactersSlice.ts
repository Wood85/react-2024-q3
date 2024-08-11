import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from './../../interfaces/interfaces';
import { emptyData } from './../../utils/constants';

export interface IState {
  data: IResponse;
  isLoading: boolean;
  pageNum: number;
}

const initialState: IState = { data: emptyData, isLoading: false, pageNum: 1 };

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCurrentCharacters: (state, action: PayloadAction<IResponse>) => {
      state.data.count = action.payload.count;
      state.data.next = action.payload.next;
      state.data.previous = action.payload.previous;
      state.data.results = action.payload.results;
    },
    loading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    pageNum: (state, action: PayloadAction<number>) => {
      state.pageNum = action.payload;
    },
  },
});

export const { setCurrentCharacters, loading, pageNum } = charactersSlice.actions;

export default charactersSlice.reducer;
