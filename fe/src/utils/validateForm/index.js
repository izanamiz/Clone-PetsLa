import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const loginSchema = yup.object().shape({
    username: yup
      .string()
      .min(8, 'Username must be between 8-20 characters!')
      .max(20, 'Username must be between 8-20 characters!')
      .required('Username is required!'),
  
    password: yup
      .string()
      .min(8, 'Password must be between 8-20 characters!')
      .max(20, 'Password must be between 8-20 characters!')
      .required('Password is required!'),
  });


export const registerSchema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),

  lastName: yup.string().required('Last name is required!'),

  email: yup.string().required('Email is required!'),

  username: yup
    .string()
    .min(8, 'Username must be between 8-20 characters!')
    .max(20, 'Username must be between 8-20 characters!')
    .required('Username is required!'),

  password: yup
    .string()
    .min(8, 'Password must be between 8-20 characters!')
    .max(20, 'Password must be between 8-20 characters!')
    .required('Password is required!'),
});

export const orderSchema = yup.object().shape({  
  phoneNum: yup
    .string()
    .min(10, "Phone number must be more than 9 number")
    .max(12, "Phone number must be less than 13 number")
    .matches(phoneRegExp, "Phone number is not valid")
    .required('Phone number is required!'),
  address: yup.string().required('Address is required'),
  note: yup.string()
})

export const profileSchema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),

  lastName: yup.string().required('Last name is required!'),

  email: yup.string().required('Email is required!'),
  phonenum: yup
    .string()
    .min(10, "Phone number must be more than 9 number")
    .max(12, "Phone number must be less than 13 number")
    .matches(phoneRegExp, "Phone number is not valid")
    .required('Phone number is required!'),

})
