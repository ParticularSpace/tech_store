import React from 'react';
import Select from 'react-select';

const categories = [
  { value: 'Laptops', label: 'Laptops' },
  { value: 'Smartphones', label: 'Smartphones' },
  { value: 'Accessories', label: 'Accessories' },
  { value: 'Gaming', label: 'Gaming' },
];

const brands = [
  { value: 'Apple', label: 'Apple' },
  { value: 'Samsung', label: 'Samsung' },
  { value: 'Dell', label: 'Dell' },
  { value: 'Sony', label: 'Sony' },
  { value: 'Microsoft', label: 'Microsoft' },
  { value: 'HP', label: 'HP' },
];

const ProductPage = () => {
  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-4xl font-semibold mb-2">Explore Our Tech Store</h2>
      <p className="text-lg mb-4">Discover the best in technology with a vast array of products and top brands.</p>

      {/* Search Bar */}
      <div className="flex mb-6">
        <input type="text" placeholder="Search..." className="border p-2 flex-grow rounded-l" />
        <button className="bg-blue-500 text-white p-2 rounded-r">Search</button>
      </div>

      <div className="flex">
        {/* Filters Section */}
        <div className="w-1/4 bg-gray-100 p-6">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>

          <div className="mb-4">
            <label className="block text-lg mb-2">Category:</label>
            <Select options={categories} isMulti />
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Price Range:</label>
            <input type="range" className="w-full" />
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Brand:</label>
            <Select options={brands} isMulti />
          </div>

          <div className="mb-4">
            <label className="block text-lg mb-2">Rating:</label>
            <input type="range" className="w-full" min="1" max="5" step="0.5" />
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-3/4 grid grid-cols-4 gap-4 pl-6">
          {/* Example Product */}
          <div className="product bg-gray-100 p-4">
            <img src="image_url" alt="product" className="w-full h-32 object-cover mb-2" />
            <h3>Product Name</h3>
            <p>Product Description</p>
            <p className="font-bold">$ Price</p>
            <button className="bg-blue-500 text-white p-2 rounded mt-2 w-full">
              Add to Cart
            </button>
          </div>
          {/* Repeat or map through products */}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
