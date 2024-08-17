import styles from './hook-form.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { forms } from '../../store/reducers/formSlice';
import { useState } from 'react';
import { countriesArr, countryType } from '../../store/reducers/countriesSlice';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/[A-Z]+|[А-Я]+/, 'The first letter must be uppercased')
    .required('Enter your name'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Enter your age')
    .min(0, 'Too little(should be no negative values)')
    .max(2025, 'Were you born to our present day?'),
  email: yup.string().email('Invalid email').required('Enter your email'),
  password: yup
    .string()
    .required('Enter your password')
    .min(8, 'Password must be at least 8 symbol')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[!"#$%&()*^+,.{}<>|@]/, 'Password must contain at least one special character(!"#$%&()*^+,.{}<>|@)'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required('Confirm password is required'),
  gender: yup.string().oneOf(['male', 'female']).required('Gender is required'),
  checkbox: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),
  file: yup
    .mixed<FileList>()
    .required('required')
    .test(
      'fileSize',
      'File size must be less than 500KB',
      (files) => !files || files.length === 0 || Array.from(files).every((file) => file.size <= 500000),
    )
    .test('fileFormat', 'File type must be png or jpeg', (value) => {
      if (value) {
        const supportedFormats = ['png', 'jpeg'];
        return supportedFormats.includes(value[0].name.split('.').pop() || '');
      }
      return true;
    }),
  country: yup.mixed<countryType>().required('Choose your country').oneOf(countriesArr, 'You must choose country'),
});

interface Form {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  checkbox: boolean;
  file: FileList;
  country: countryType;
}

const HookForm = () => {
  const dispatch = useAppDispatch();
  const getForms = useAppSelector((state) => state.form.forms);
  const getCountries = useAppSelector((state) => state.countries);

  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Form>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmitHandler = (data: Form) => {
    const localImageUrl = window.URL.createObjectURL(data.file[0]);

    const result = {
      name: data.name,
      age: data.age,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      gender: data.gender,
      checkbox: data.checkbox,
      file: localImageUrl,
    };

    const newForms = JSON.parse(JSON.stringify(getForms));
    newForms.push(result);
    dispatch(forms(newForms));
    console.log(newForms);
    reset();
  };

  function evaluatePasswordStrength(password: string) {
    let score = 0;
    if (!password) return '';
    if (password.length > 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!"#$%&()*^+,.{}<>|@]/.test(password)) score += 1;

    switch (score) {
      case 0:
      case 1:
      case 2:
        return 'Weak';
      case 3:
      case 4:
        return 'Medium';
      case 5:
        return 'Strong';
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>React Hook Form</h1>
        <form className={styles.form} onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input {...register('name')} className={styles.input} placeholder="Enter your name" type="text" id="name" />
            <div className={styles.error}>{errors.name?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="age">Age</label>
            <input {...register('age')} className={styles.input} placeholder="Enter your age" type="number" id="age" />
            <div className={styles.error}>{errors.age?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              {...register('email')}
              className={styles.input}
              placeholder="Enter your email"
              type="email"
              id="email"
            />
            <div className={styles.error}>{errors.email?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              {...register('password', {
                onChange: (event) => {
                  setPassword(event.target.value);
                  setStrength(evaluatePasswordStrength(event.target.value) || '');
                },
              })}
              className={styles.input}
              placeholder="Enter your password"
              type="password"
              id="password"
              value={password}
            />
            <small>Password strength: {strength}</small>
            <div className={styles.error}>{errors.password?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              {...register('confirmPassword')}
              className={styles.input}
              placeholder="Confirm your password"
              type="password"
              id="confirm-password"
            />
            <div className={styles.error}>{errors.confirmPassword?.message}</div>
          </div>

          <div className={styles.field}>
            <label>Gender</label>
            <select {...register('gender')} className={styles.select} name="gender">
              <option value="male" className={styles.option}>
                male
              </option>
              <option value="female" className={styles.option}>
                female
              </option>
            </select>
            <div className={styles.error}>{errors.gender?.message}</div>
          </div>

          <div className={`${styles.field} ${styles.fieldCheckbox}`}>
            <div className={styles.checkboxContainer}>
              <input {...register('checkbox')} className={styles.checkbox} type="checkbox" id="t-and-c" />
              <label htmlFor="t-and-c">Accept Terms and Conditions agreement</label>
            </div>
            <div className={styles.error}>{errors.checkbox?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="file">Upload picture</label>
            <input {...register('file')} className={styles.input} type="file" id="file" />
            <div className={styles.error}>{errors.file?.message}</div>
          </div>

          <div className={styles.field}>
            <label htmlFor="country">Choose country</label>
            <input
              autoComplete="off"
              {...register('country')}
              type="text"
              id="country"
              list="countries"
              className={styles.input}
              placeholder="Choose country"
            />
            <datalist id="countries">
              {getCountries.countries.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </datalist>
            <div className={styles.error}>{errors.country?.message}</div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default HookForm;
