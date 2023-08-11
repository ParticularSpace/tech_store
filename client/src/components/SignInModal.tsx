import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form data submitted:', values);
      // Handle the sign-in logic here, e.g., make an API call
    },
  });

  if (!isOpen) return null;

  return (
    <div className="container mx-auto p-4">
      <span className="absolute top-0 right-0 p-4 cursor-pointer" onClick={onClose}>
        &times; {/* This is the Close button */}
      </span>
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={formik.handleSubmit}>
        <input {...formik.getFieldProps('email')} className="text-black p-2 mb-3 border rounded-lg w-full" type="text" placeholder="Email" />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <input {...formik.getFieldProps('password')} className="text-black p-2 mb-3 border rounded-lg w-full" type="password" placeholder="Password" />
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="submit">Sign In</button>
      </form>
      <br />
      <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="button" onClick={onRegister}>
        Register
      </button>
    </div>
  );
};

export default SignInModal;
