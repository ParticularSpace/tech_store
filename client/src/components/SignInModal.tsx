
import React from 'react';
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
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await signIn({
          variables: {
            input: {
              email: values.email,
              password: values.password,
            },
          },
        });
        localStorage.setItem('auth_token', data.signIn.token);
        localStorage.setItem('user', JSON.stringify(data.signIn.user));
        onClose();
      } catch (error) {
        console.error('Failed to sign in:', error);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">Sign In</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          {...formik.getFieldProps('email')}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="text"
          placeholder="Email"
        />
        <input
          {...formik.getFieldProps('password')}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="password"
          placeholder="Password"
        />
        <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="submit">
          Sign In
        </button>
      </form>
      <div className="text-center mt-4">
        <span>Don't have an account?</span>
        <button className="text-blue-500 ml-2" onClick={onRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
