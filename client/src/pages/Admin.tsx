import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../gql/queries';

const Admin = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data.currentUser;

  console.log("Data: ", data);

  if (!user || !user.roles || !user.roles.includes('ADMIN')) {
    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-semibold mb-4">Unauthorized</h1>
        <p className="text-lg mb-4">You must be an admin to access this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-4xl font-semibold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        {/* Add Product Section */}
        <div className="bg-gray-100 p-4">
          <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
          {/* Product Form here */}
        </div>

        {/* Update Product Section */}
        <div className="bg-gray-100 p-4">
          <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
          {/* Update Form here */}
        </div>

        {/* Other Admin Features */}
        <div className="bg-gray-100 p-4">
          <h2 className="text-2xl font-semibold mb-4">Other Features</h2>
          {/* Other Features here */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
