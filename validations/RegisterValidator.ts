import * as yup from 'yup';

export const RegisterSchema = yup.object().shape({
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters long'),
    password: yup.string().required('Password is required').min(3, 'Password must be atleast 3 characters long'),
    role: yup.string().required('Role is required').oneOf(['admin', 'user'], 'Role must be either admin or user'),
    email: yup.string().email('Invalid email format').required('Email is required'),
});