import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const LandingPage = () => {
  const categories = [
    // Define your categories here
    { name: 'Laptops', image: 'https://via.placeholder.com/200x150' },
    { name: 'Smartphones', image:'https://via.placeholder.com/200x150' },
    { name: 'Accessories', image: 'https://via.placeholder.com/200x150' },
    { name: 'Gaming', image: 'https://via.placeholder.com/200x150' },
    { name: 'Audio', image: 'https://via.placeholder.com/200x150' },
    { name: 'Cameras', image: 'https://via.placeholder.com/200x150' },
    { name: 'Monitors', image: 'https://via.placeholder.com/200x150' },
    { name: 'Printers', image: 'https://via.placeholder.com/200x150' },
  ];

  const featuredProducts = [
    { name: 'Gaming Laptop', image: 'https://via.placeholder.com/150x100', description: 'High-performance gaming laptop' },
    { name: 'Smartwatch', image: 'https://via.placeholder.com/150x100', description: 'Sleek and stylish smartwatch' },
    { name: 'Bluetooth Speaker', image: 'https://via.placeholder.com/150x100', description: 'Portable Bluetooth speaker' },
    // ... more products
  ];

  const dealsOfTheDay = [
    { name: '4K Monitor', image: 'https://via.placeholder.com/150x100', description: 'Stunning 4K display monitor' },
    { name: 'Wireless Earbuds', image: 'https://via.placeholder.com/150x100', description: 'High-quality wireless earbuds' },
    { name: 'Gaming Mouse', image: 'https://via.placeholder.com/150x100', description: 'Ergonomic gaming mouse' },
  ];

  const trendingProducts = [
    { name: 'Smart TV', image: 'https://via.placeholder.com/150x100', description: 'Smart TV with voice control' },
    { name: 'Fitness Tracker', image: 'https://via.placeholder.com/150x100', description: 'Track your fitness goals' },
    { name: 'Robot Vacuum', image: 'https://via.placeholder.com/150x100', description: 'Efficient robot vacuum cleaner' },
  ];


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // Add additional settings as needed
  };

  

  return (
    <div className="container mx-auto my-8 p-4">

      {/* Banner Section */}
      <div className="banner bg-blue-200 p-8 text-center rounded mb-8">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Tech Store</h2>
        <p className="text-xl mb-4">Explore the latest gadgets and tech products at unbeatable prices.</p>
        <button className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mt-4">Shop Now</button>
      </div>

      {/* Categories Section */}
      <div className="mb-8">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="p-4">
              <img src={category.image} alt={category.name} className="rounded w-full h-40 object-cover" />
              <h3 className="text-xl text-center mt-2">{category.name}</h3>
            </div>
          ))}
        </Slider>
      </div>

      {/* Featured Products Section */}
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {featuredProducts.map((product, index) => (
          <div key={index} className="p-4 border rounded">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h3 className="text-lg text-center mt-2">{product.name}</h3>
            <p className="text-sm text-center mt-1">{product.description}</p>
          </div>
        ))}
      </div>

 
    <div className="container mx-auto my-8 p-4">

      {/* Deals of the Day Section */}
      <h2 className="text-2xl font-semibold mb-4">Deals of the Day</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {dealsOfTheDay.map((product, index) => (
          <div key={index} className="p-4 border rounded">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h3 className="text-lg text-center mt-2">{product.name}</h3>
            <p className="text-sm text-center mt-1">{product.description}</p>
          </div>
        ))}
      </div>

      {/* Trending Products Section */}
      <h2 className="text-2xl font-semibold mb-4">Trending Products</h2>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {trendingProducts.map((product, index) => (
          <div key={index} className="p-4 border rounded">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
            <h3 className="text-lg text-center mt-2">{product.name}</h3>
            <p className="text-sm text-center mt-1">{product.description}</p>
          </div>
        ))}
      </div>
    </div>

      {/* Call to Action Section */}
      <div className="bg-yellow-400 p-4 text-center rounded">
        <h2 className="text-2xl font-semibold mb-2">Ready to explore more?</h2>
        <p>Join us and find the perfect tech for you!</p>
        <button className="bg-blue-500 hover:bg-blue-400 text-white p-2 rounded mt-4">Shop Now</button>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-8 mt-8">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">About Us</h3>
            <p>Information about the company</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Contact</h3>
            <p>Email: support@techstore.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
