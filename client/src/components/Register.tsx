import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Register = ({ onClose }: { onClose: () => void }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      subscribe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form data submitted:', values);
      // Handle the registration logic here, e.g., make an API call
    },
  });

  return (
    <div className="container mx-auto p-4">
      <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={onClose}>
        &times; {/* This is the Close button */}
      </span>
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <input {...formik.getFieldProps('firstName')} className="text-black p-2 mb-3 border rounded-lg w-full" type="text" placeholder="First Name" />
        {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
        <input {...formik.getFieldProps('lastName')} className="text-black p-2 mb-3 border rounded-lg w-full" type="text" placeholder="Last Name" />
        <input {...formik.getFieldProps('email')} className="text-black p-2 mb-3 border rounded-lg w-full" type="email" placeholder="Email" />
        <input {...formik.getFieldProps('password')} className="text-black p-2 mb-3 border rounded-lg w-full" type="password" placeholder="Password" />
        <label className="flex items-center mb-3">
          <input {...formik.getFieldProps('subscribe')} type="checkbox" defaultChecked />
          <span className="ml-2 text-black">Subscribe to promotional emails</span>
        </label>
        <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
