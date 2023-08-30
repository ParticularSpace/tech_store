import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">
          &copy; 2023 Tech Store. All rights reserved.
        </p>
        <Link to="/admin" className="text-sm bg-blue-500 p-2 rounded">
          Admin
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
