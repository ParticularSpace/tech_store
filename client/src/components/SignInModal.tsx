import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { SIGN_IN_MUTATION } from '../gql/mutations';

type SignInModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onRegister }) => {
  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION);
  const [signInError, setSignInError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      signIn({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      })
      .then(response => {
        const token = response.data.signIn.token;
        localStorage.setItem('auth_token', token); // Storing the token
        // Redirect to a protected page or perform other actions on successful sign-in
        onClose(); // Close the modal
      })
      .catch(err => {
        setSignInError('Failed to sign in. Please check your credentials and try again.'); // Displaying an error message
      });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (!isOpen) return null;

  return (
    <div className="container mx-auto p-4">
      <span className="absolute top-12 right-6 p-6 cursor-pointer" onClick={onClose}>
        &times; {/* This is the Close button */}
      </span>
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      {signInError && <p className="text-red-600 mb-4">{signInError}</p>}
      <form onSubmit={formik.handleSubmit}>
        <input {...formik.getFieldProps('email')} className="text-black p-2 mb-3 border rounded-lg w-full" type="text" placeholder="Email" />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <input {...formik.getFieldProps('password')} className="text-black p-2 mb-3 border rounded-lg w-full" type="password" placeholder="Password" />
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="submit">Sign In</button>
      </form>
      <div className="h-px bg-gray-300 my-4"></div>
      <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="button" onClick={onRegister}>
        Register
      </button>
    </div>
  );
};

export default SignInModal;
