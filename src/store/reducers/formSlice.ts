import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const emptyForm: Form = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: 'male',
  checkbox: false,
  file: '',
};

export interface Form {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  checkbox: boolean;
  file: string;
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
      state.currentForm.confirmPassword = action.payload.confirmPassword;
      state.currentForm.gender = action.payload.gender;
      state.currentForm.checkbox = action.payload.checkbox;
      state.currentForm.file = action.payload.file;
    },
    forms: (state, action: PayloadAction<Form[]>) => {
      state.forms = action.payload;
    },
  },
});

export const { setForm, forms } = formSlice.actions;

export default formSlice.reducer;
