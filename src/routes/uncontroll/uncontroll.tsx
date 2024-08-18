import styles from './uncontroll.module.css';
import { forms } from '../../store/reducers/formSlice';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import React, { RefObject, SyntheticEvent, useState } from 'react';
import * as yup from 'yup';
// import { countryType, countriesArr } from '../../store/reducers/countriesSlice';
import ErrorComponent from './../../components/error-component/ErrorComponent';
import schema from './../../utils/schema';

interface IError {
  name: string;
  message: string;
}

const Uncontroll = () => {
  const [errors, setErrors] = useState([{ name: '', message: '' }]);
  const [strength, setStrength] = useState('');
  const dispatch = useAppDispatch();
  const getForms = useAppSelector((state) => state.form.forms);
  const getCountries = useAppSelector((state) => state.countries);
  const navigate = useNavigate();

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

  // const schema = yup.object().shape({
  //   name: yup.string()
  //     .matches(/[A-Z]+|[А-Я]+/, 'The first letter must be uppercased')
  //     .required('Enter your name'),
  //   age: yup
  //     .number().integer()
  //     .typeError('Age must be a number')
  //     .required('Enter your age')
  //     .min(1, 'Too little(should be no negative values)')
  //     .max(2025, 'Were you born to our present day?')
  //     .required('Enter your age'),
  //   email: yup.string().email('Invalid email').required('Enter your email'),
  //   password: yup
  //     .string()
  //     .required('Enter your password')
  //     .min(8, 'Password must be at least 8 symbol')
  //     .matches(/[0-9]/, 'Password must contain at least one number')
  //     .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
  //     .matches(/[a-z]/, 'Must contain at least one lowercase letter')
  //     .matches(/[!"#$%&()*^+,.{}<>|@]/, 'Must contain at least one special character'),
  //   confirmPassword: yup
  //     .string()
  //     .oneOf([yup.ref('password')], 'Password must match')
  //     .required('Confirm password is required'),
  //   gender: yup.string().oneOf(['male', 'female']).required('Gender is required'),
  //   checkbox: yup.boolean().oneOf([true], 'You must accept the terms and conditions').required(),
  //   file: yup.mixed<FileList>()
  //     .required('Image is required. ')
  //     .test(
  //       'type',
  //       'File type must be .png or .jpeg. ',
  //       (value) => value[0]?.type === 'image/png' || value[0]?.type === 'image/jpeg',
  //     )
  //     .test('fileSize', 'File size must be less than 1MB. ', (value) => value[0]?.size <= 1048576),

  //   country: yup.mixed<countryType>().required('Choose your country').oneOf(countriesArr, 'You must choose country'),
  // });

  const inputName: RefObject<HTMLInputElement> = React.createRef();
  const inputAge: RefObject<HTMLInputElement> = React.createRef();
  const inputEmail: RefObject<HTMLInputElement> = React.createRef();
  const inputPassword: RefObject<HTMLInputElement> = React.createRef();
  const inputConfirmPassword: RefObject<HTMLInputElement> = React.createRef();
  const inputGender: RefObject<HTMLSelectElement> = React.createRef();
  const inputCheckbox: RefObject<HTMLInputElement> = React.createRef();
  const inputFile: RefObject<HTMLInputElement> = React.createRef();
  const inputCountry: RefObject<HTMLInputElement> = React.createRef();

  function getErrMessage(name: string): string[] {
    const res: string[] = [];
    errors.forEach((error) => {
      if (error.name === name) {
        res.push(error.message);
      }
    });
    return res;
  }

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formData = {
      name: inputName.current?.value ?? '',
      age: Number(inputAge.current?.value ?? 0),
      email: inputEmail.current?.value ?? '',
      password: inputPassword.current?.value ?? '',
      confirmPassword: inputConfirmPassword.current?.value ?? '',
      gender: inputGender.current?.value ?? 'male',
      checkbox: inputCheckbox.current?.checked ?? false,
      file: inputFile.current?.files ?? '',
      country: inputCountry.current?.value ?? '',
    };
    setStrength(evaluatePasswordStrength(formData.password) as string);

    schema
      .validate(formData, { abortEarly: false })
      .then(async (data) => {
        const localImageUrl = await window.URL.createObjectURL(data.file[0]);
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
        navigate('/');
      })
      .catch((error: yup.ValidationError) => {
        const errorArr: IError[] = [];
        error.inner.forEach((item) => errorArr.push({ name: item.path as string, message: item.message }));
        setErrors(errorArr);
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Uncontrolled components</h1>
        <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input className={styles.input} placeholder="Enter your name" type="text" id="name" ref={inputName} />
            <div className={styles.errorName}>
              <ErrorComponent errors={getErrMessage('name')} />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="age">Age</label>
            <input className={styles.input} placeholder="Enter your age" type="number" id="age" ref={inputAge} />
            <div className={styles.errorAge}>
              <ErrorComponent errors={getErrMessage('age')} />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input ref={inputEmail} className={styles.input} placeholder="Enter your email" type="email" id="email" />
            <div className={styles.errorEmail}>
              <ErrorComponent errors={getErrMessage('email')} />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              ref={inputPassword}
              className={styles.input}
              placeholder="Enter your password"
              type="password"
              id="password"
            />
            <small>Password strength: {strength}</small>
            <div className={styles.errorPassword}>
              <ErrorComponent errors={getErrMessage('password')} />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              ref={inputConfirmPassword}
              className={styles.input}
              placeholder="Confirm your password"
              type="password"
              id="confirm-password"
            />
            <div className={styles.errorConfirmPassword}>
              <ErrorComponent errors={getErrMessage('confirmPassword')} />
            </div>
          </div>

          <div className={styles.field}>
            <label>Gender</label>
            <select className={styles.select} name="gender" ref={inputGender}>
              <option value="male" className={styles.option}>
                male
              </option>
              <option value="female" className={styles.option}>
                female
              </option>
            </select>
            <div className={styles.errorGender}>
              <ErrorComponent errors={getErrMessage('gender')} />
            </div>
          </div>

          <div className={`${styles.field} ${styles.fieldCheckbox}`}>
            <div className={styles.checkboxContainer}>
              <input className={styles.checkbox} type="checkbox" id="t-and-c" ref={inputCheckbox} />
              <label htmlFor="t-and-c">Accept Terms and Conditions agreement</label>
            </div>
            <div className={styles.errorCheckbox}>
              <ErrorComponent errors={getErrMessage('checkbox')} />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="file">Upload picture</label>
            <input className={styles.input} type="file" id="file" ref={inputFile} />
            <div className={styles.errorFile}>
              <ErrorComponent errors={getErrMessage('file')} />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="country">Choose country</label>
            <input
              autoComplete="off"
              type="text"
              id="country"
              list="countries"
              className={styles.input}
              placeholder="Choose country"
              ref={inputCountry}
            />
            <datalist id="countries">
              {getCountries.countries.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </datalist>
            <div className={styles.errorCountry}>
              <ErrorComponent errors={getErrMessage('country')} />
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Uncontroll;
