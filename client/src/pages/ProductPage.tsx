import React, { useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { GET_ALL_PRODUCTS } from "../gql/queries";
import { ADD_PRODUCT_TO_CART } from "../gql/mutations";
import { useQuery, useMutation } from "@apollo/client";

type OptionType = { value: string; label: string };

const categories: OptionType[] = [
  { value: "Laptops", label: "Laptops" },
  { value: "Smartphones", label: "Smartphones" },
  { value: "Accessories", label: "Accessories" },
  { value: "Gaming", label: "Gaming" },
];

const brands: OptionType[] = [
  { value: "Apple", label: "Apple" },
  { value: "Samsung", label: "Samsung" },
  { value: "Dell", label: "Dell" },
  { value: "Sony", label: "Sony" },
  { value: "Microsoft", label: "Microsoft" },
  { value: "HP", label: "HP" },
];

const colors: OptionType[] = [
  { value: "Red", label: "Red" },
  { value: "Blue", label: "Blue" },
  { value: "Green", label: "Green" },
];

const priceOptions: OptionType[] = [
  { value: "<10", label: "Under $10" },
  { value: "<25", label: "Under $25" },
  { value: "<50", label: "Under $50" },
];

type Filters = {
  selectedCategories: OptionType[];
  selectedBrands: OptionType[];
  selectedPrice: OptionType | null;
  selectedColors: OptionType[];
  selectedRating: number | null;
};

interface CartItem {
  id: string;
  quantity: number;
}



const ProductPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search") || "";

  const [addProductToCart, { loading: addingToCart, error: addToCartError }] = useMutation(ADD_PRODUCT_TO_CART);

  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {
    variables: { search: searchQuery },
  });

  const [filters, setFilters] = useState<Filters>({
    selectedCategories: [],
    selectedBrands: [],
    selectedPrice: null,
    selectedColors: [],
    selectedRating: null,
  });

  const applyFilters = () => {
    // Your filter logic here
    console.log(filters);
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const auth_token = localStorage.getItem("auth_token");

    if (user && auth_token) {
      // User is logged in, add product to user's cart in the database
      addProductToCart({
        variables: { productId, quantity }
      });
    } else {
      // User is not logged in, add product to local storage
      let storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingProductIndex = storedCart.findIndex((item: CartItem) => item.id === productId);


      if (existingProductIndex > -1) {
        // If product already exists in cart, update the quantity
        storedCart[existingProductIndex].quantity += quantity;
      } else {
        // If product is new, add it to the cart
        storedCart.push({
          id: productId,
          quantity
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(storedCart));
    }
  };

  

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-4xl font-semibold mb-2">Explore Our Tech Store</h2>
      <p className="text-lg mb-4">
        Discover the best in technology with a vast array of products and top
        brands.
      </p>
      <div className="flex">
        {/* Filters Section Start*/}
        <div className="w-1/4 bg-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>

          <div className="mb-4">
            <label className="block text-lg mb-2">Category:</label>
            <Select
              options={categories}
              isMulti
              onChange={(selected) =>
                setFilters({
                  ...filters,
                  selectedCategories: Array.from(selected as OptionType[]),
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Brands:</label>
            <Select
              options={brands}
              isMulti
              onChange={(selected) =>
                setFilters({
                  ...filters,
                  selectedBrands: Array.from(selected as OptionType[]),
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2">Colors:</label>
            <Select
              options={colors}
              isMulti
              onChange={(selected) =>
                setFilters({
                  ...filters,
                  selectedColors: Array.from(selected as OptionType[]),
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Rating:</label>
            {[5, 4, 3, 2, 1].map((star) => (
              <label key={star} className="block">
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  onChange={() =>
                    setFilters({ ...filters, selectedRating: star })
                  }
                />
                {" ".repeat(star)}{" "}
                {"\u2605".repeat(star) + "\u2606".repeat(5 - star)}
              </label>
            ))}
          </div>

          <button
            className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
        {/* Filters Section End*/}

        {/* Products List */}
        <div className="w-3/4 pl-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            data.getAllProducts.map((product: any, index: number) => (
              <div key={index} className="product bg-gray-100 p-4 mb-4 flex">
                <Link to={`/item/${product.id}`} className="flex-1">
                  <img
                    src={product.imgUrl}
                    alt="product"
                    className="w-32 h-32 object-cover mb-2"
                  />
                </Link>
                <div className="flex-1 pl-4">
                  <Link to={`/item/${product.id}`}>
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                  </Link>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">${product.price}</p>
                    <span className="text-yellow-400">
                      &#9733; &#9733; &#9733; &#9733; &#9734;
                    </span>
                  </div>
                  <p className="truncate">{product.description}</p>
                  <button 
          className="bg-blue-500 text-white p-2 rounded mt-2 w-full" 
          onClick={() => handleAddToCart(product.id, 1)}
        >
          Add to Cart
        </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Pagination Section */}
      <div className="flex justify-center my-6">
        <button className="bg-blue-500 text-white p-2 rounded mx-2">1</button>
        <button className="bg-blue-100 text-blue-500 p-2 rounded mx-2">
          2
        </button>
        <button className="bg-blue-100 text-blue-500 p-2 rounded mx-2">
          3
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
