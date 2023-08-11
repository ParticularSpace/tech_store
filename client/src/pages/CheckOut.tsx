import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY_HERE');

const schema = yup.object().shape({
    billingName: yup.string().required('Name is required'),
    billingAddress: yup.string().required('Address is required'),
    billingCity: yup.string().required('City is required'),
    billingState: yup.string().required('State is required'),
    billingZip: yup.string().required('ZIP is required'),
    shippingName: yup.string(),
    shippingAddress: yup.string(),
    shippingCity: yup.string(),
    shippingState: yup.string(),
    shippingZip: yup.string(),
  });

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { handleSubmit, control, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(true);

  const onSubmit = async (data: any) => {
    if (shippingSameAsBilling) {
      data.shippingName = data.billingName;
      data.shippingAddress = data.billingAddress;
      data.shippingCity = data.billingCity;
      data.shippingState = data.billingState;
      data.shippingZip = data.billingZip;
    }
    // Further processing
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-lg font-semibold">Billing Address</label>
        <Controller name="billingName" control={control} defaultValue="" render={({ field }) => <input {...field} className="border p-2 rounded w-full" placeholder="Name" />} />
        <Controller name="billingAddress" control={control} defaultValue="" render={({ field }) => <input {...field} className="border p-2 rounded w-full" placeholder="Address" />} />
        <Controller name="billingCity" control={control} defaultValue="" render={({ field }) => <input {...field} className="border p-2 rounded w-full" placeholder="City" />} />
        <Controller name="billingState" control={control} defaultValue="" render={({ field }) => <input {...field} className="border p-2 rounded w-full" placeholder="State" />} />
        <Controller name="billingZip" control={control} defaultValue="" render={({ field }) => <input {...field} className="border p-2 rounded w-full" placeholder="ZIP" />} />
      </div>
      <div className="space-y-2">
        <label className="block text-lg font-semibold">Payment Method</label>
        <CardElement className="border p-2 rounded" />
      </div>
      <div className="space-y-2">
        <label className="block text-lg font-semibold">Shipping Address</label>
        <label>
          <input type="checkbox" defaultChecked onChange={(e) => setShippingSameAsBilling(e.target.checked)} />
          {' '}Shipping same as billing
        </label>
        {!shippingSameAsBilling && (
          <>
            <Controller name="shippingName" control={control} defaultValue="" render={({ field }) => <input {...field} className="border p-2 rounded w-full" placeholder="Name" />} />
            <Controller name="shippingAddress" control={control} defaultValue="" render={({ field }) => <input {...field} className="border p-2 rounded w-full" placeholder="Address" />} />
            <Controller name="shippingCity" control={control} defaultValue="" render={({ field }) => <input {...field} className="border p-2 rounded w-full" placeholder="City" />} />
            <Controller name="shippingState" control={control} defaultValue="" render={({ field }) => <input {...field} className="border p-2 rounded w-full" placeholder="State" />} />
            <Controller name="shippingZip" control={control} defaultValue="" render={({ field }) => <input {...field} className="border p-2 rounded w-full" placeholder="ZIP" />} />
          </>
        )}
      </div>
      <button type="submit" disabled={!stripe} className="bg-yellow-400 hover:bg-yellow-300 p-2 rounded w-full">
        Pay
      </button>
      {/* Handle form errors */}
    </form>
  );
};

const Checkout = () => (
  <div className="flex flex-col lg:flex-row p-2 space-y-2 lg:space-y-0 lg:space-x-2">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    <div className="lg:w-1/3 border p-4">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {/* Order summary content */}
    </div>
  </div>
);

export default Checkout;
