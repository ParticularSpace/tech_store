const LandingPage = () => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-4">Welcome to Our Tech Store</h2>
      <p className="text-lg mb-4">Explore the latest gadgets and tech products at unbeatable prices.</p>

      {/* Categories Section */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="category bg-gray-100 p-4 text-center">
          <h3>Laptops</h3>
        </div>
        <div className="category bg-gray-100 p-4 text-center">
          <h3>Smartphones</h3>
        </div>
        <div className="category bg-gray-100 p-4 text-center">
          <h3>Accessories</h3>
        </div>
        <div className="category bg-gray-100 p-4 text-center">
          <h3>Gaming</h3>
        </div>
      </div>

      {/* Featured Products Section */}
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* You can replace this with a map function to render products dynamically */}
        <div className="product bg-gray-100 p-4">
          <h3>Product Name</h3>
          <p>Product Description</p>
          <p className="font-bold">$ Price</p>
        </div>
        <div className="product bg-gray-100 p-4">
          <h3>Product Name</h3>
          <p>Product Description</p>
          <p className="font-bold">$ Price</p>
        </div>
        <div className="product bg-gray-100 p-4">
          <h3>Product Name</h3>
          <p>Product Description</p>
          <p className="font-bold">$ Price</p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-yellow-400 p-4 text-center rounded">
        <h2 className="text-2xl font-semibold mb-2">Ready to explore more?</h2>
        <p>Join us and find the perfect tech for you!</p>
        <button className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mt-4">Shop Now</button>
      </div>
    </div>
  );
};

export default LandingPage;
