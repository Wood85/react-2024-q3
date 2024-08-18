import styles from './hook-form.module.css';
import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { forms } from '../../store/reducers/formSlice';
import { useState } from 'react';
import { countryType } from '../../store/reducers/countriesSlice';
import { useNavigate } from 'react-router-dom';
import schema from './../../utils/schema';

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getForms = useAppSelector((state) => state.form.forms);
  const getCountries = useAppSelector((state) => state.countries);

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
      country: data.country,
    };

    const newForms = JSON.parse(JSON.stringify(getForms));
    newForms.push(result);
    dispatch(forms(newForms));
    reset();
    navigate('/');
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
                  setStrength(evaluatePasswordStrength(event.target.value) || '');
                },
              })}
              className={styles.input}
              placeholder="Enter your password"
              type="password"
              id="password"
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
