import * as yup from 'yup';
import { countryType, countriesArr } from './../store/reducers/countriesSlice';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/[A-Z]+|[А-Я]+/, 'The first letter must be uppercased')
    .required('Enter your name'),
  age: yup
    .number()
    .integer()
    .typeError('Age must be a number')
    .required('Enter your age')
    .min(1, 'Too little(should be no negative values)')
    .max(2025, 'Were you born to our present day?')
    .required('Enter your age'),
  email: yup.string().email('Invalid email').required('Enter your email'),
  password: yup
    .string()
    .required('Enter your password')
    .min(8, 'Password must be at least 8 symbol')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[!"#$%&()*^+,.{}<>|@]/, 'Must contain at least one special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required('Confirm password is required'),
  gender: yup.string().oneOf(['male', 'female']).required('Gender is required'),
  checkbox: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),
  file: yup
    .mixed<FileList>()
    .required('Image is required. ')
    .test(
      'type',
      'File type must be .png or .jpeg. ',
      (value) => value[0]?.type === 'image/png' || value[0]?.type === 'image/jpeg',
    )
    .test('fileSize', 'File size must be less than 1MB. ', (value) => value[0]?.size <= 1048576),

  country: yup.mixed<countryType>().required('Choose your country').oneOf(countriesArr, 'You must choose country'),
});

export default schema;
