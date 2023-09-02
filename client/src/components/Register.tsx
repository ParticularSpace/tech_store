import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from '../gql/mutations';

const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});


const Register = ({ onClose, openSignIn }: { onClose: () => void, openSignIn: () => void }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [signIn, { data: signInData }] = useMutation(SIGN_IN_MUTATION);
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
    onCompleted: (data) => {
      setSuccessMessage("Account created successfully!");
      signIn({
        variables: {
          input: {
            email: data.createUser.email,
            password: formik.values.password,  // Assuming formik.values.password contains the password
          },
        },
      }).then((response) => {
        // Store your token in localStorage or handle it as you wish
        localStorage.setItem('token', response.data.signIn.token);
        onClose();
      }).catch((signInError) => {
        // Handle sign-in error
        console.error('Sign-in error:', signInError);
      });
    }
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      subscribe: true,
    },
    validationSchema,
    onSubmit: (values) => {
      createUser({
        variables: {
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          },
        },
      });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4 z-999">
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          {...formik.getFieldProps("firstName")}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="text"
          placeholder="First Name"
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
        <input
          {...formik.getFieldProps("lastName")}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="text"
          placeholder="Last Name"
        />
        <input
          {...formik.getFieldProps("email")}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="email"
          placeholder="Email"
        />
        <input
          {...formik.getFieldProps("password")}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="password"
          placeholder="Password"
        />
         <input
          {...formik.getFieldProps("confirmPassword")}
          className="text-black p-2 mb-3 border rounded-lg w-full"
          type="password"
          placeholder="Confirm Password"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
        <label className="flex items-center mb-3">
          <input {...formik.getFieldProps("subscribe")} type="checkbox" defaultChecked />
          <span className="ml-2 text-black">
            Subscribe to promotional emails
          </span>
        </label>

        <button className="bg-blue-500 text-white p-2 rounded-lg w-full" type="submit">
          Register
        </button>
      </form>
      <div className="h-px bg-gray-300 my-4"></div>
      <span className="text-sm">
        Already have an account? Log in 
        <span className="text-blue-500 hover:underline cursor-pointer" onClick={openSignIn}>
          {' '} here
        </span>
        .
      </span>
    </div>
  );
};

export default Register;

