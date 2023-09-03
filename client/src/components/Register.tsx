
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../gql/mutations';

type RegisterProps = {
  onClose: () => void;
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Register: React.FC<RegisterProps> = ({ onClose }) => {
  const [createUser, { loading }] = useMutation(CREATE_USER_MUTATION);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await createUser({
          variables: {
            input: {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
            },
          },
        });
        onClose();
      } catch (error) {
        console.error('Failed to register:', error);
      }
    },
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          {...formik.getFieldProps('firstName')}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="text"
          placeholder="First Name"
        />
        <input
          {...formik.getFieldProps('lastName')}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="text"
          placeholder="Last Name"
        />
        <input
          {...formik.getFieldProps('email')}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="email"
          placeholder="Email"
        />
        <input
          {...formik.getFieldProps('password')}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="password"
          placeholder="Password"
        />
        <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="submit">
          Register
        </button>
      </form>
      <div className="text-center mt-4">
        <button className="text-blue-500" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Register;
