import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCT } from "../gql/queries";
import { ADD_PRODUCT_TO_CART } from "../gql/mutations";

const ItemPage: React.FC = () => {
  // Using React Router's useParams to get the product ID from the URL
  const { id } = useParams<{ id: string }>();

  const [addProductToCart, { loading: addingToCart, error: addToCartError }] =
    useMutation(ADD_PRODUCT_TO_CART);

  // Create a function to handle adding to cart
  const handleAddToCart = (productId: string, quantity: number) => {
    addProductToCart({
      variables: { productId, quantity },
    });
  };

  // Fetching the product data
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data.getProduct) return <p>Product not found</p>; // Handling case when product is not found

  const product = data.getProduct;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-4xl font-semibold">{product.name}</h1>
      <img
        src={product.imgUrl}
        alt={product.name}
        className="w-full h-64 object-cover mb-8"
      />{" "}
      {/* Adjust image dimensions */}
      <p className="text-lg mb-4">{product.description}</p>
      <p className="text-xl mb-4">Price: ${product.price}</p>
      <button
        className="bg-blue-500 text-white p-2 rounded"
        onClick={() => id && handleAddToCart(id, 1)}
        disabled={!id}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ItemPage;
