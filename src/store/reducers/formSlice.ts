import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countryType } from './countriesSlice';

const emptyForm: Form = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: 'male',
  checkbox: false,
  file: '',
  country: 'Afghanistan',
};

export interface Form {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female';
  checkbox: boolean;
  file: string;
  country: countryType;
}

const initialState: { currentForm: Form; forms: Form[] } = { currentForm: emptyForm, forms: [] };

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<Form>) => {
      state.currentForm.name = action.payload.name;
      state.currentForm.age = action.payload.age;
      state.currentForm.email = action.payload.email;
      state.currentForm.password = action.payload.password;
      state.currentForm.gender = action.payload.gender;
      state.currentForm.checkbox = action.payload.checkbox;
      state.currentForm.file = action.payload.file;
      state.currentForm.country = action.payload.country;
    },
    forms: (state, action: PayloadAction<Form[]>) => {
      state.forms = action.payload;
    },
  },
});

export const { setForm, forms } = formSlice.actions;

export default formSlice.reducer;
