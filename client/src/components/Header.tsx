import React, { useState } from 'react';
import SignInModal from './SignInModal';
import Register from './Register'; // Import the Register component

const Header = () => {
  const [signInIsOpen, setSignInIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const openSignIn = () => setSignInIsOpen(true);
  const closeSignIn = () => setSignInIsOpen(false);

  const handleRegister = () => {
    closeSignIn();
    setIsRegistering(true);
  };

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="mr-4">
            <img
              src="../assets/images/logo.png" 
              alt="Gadget Logo"
              className="w-10 h-10"
            />
          </a>
          <h1 className="text-2xl font-bold">Gadget</h1>
        </div>

        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Products</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>

        <div className="flex items-center space-x-4">
        <button onClick={openSignIn} className="bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded">
          Sign In
        </button>
        <a href="#" className="hover:underline">Cart (0)</a>
        </div>
      </div>
      {signInIsOpen && !isRegistering && <SignInModal isOpen={signInIsOpen} onClose={closeSignIn} onRegister={handleRegister} />}
      {isRegistering && <Register />}
    </header>
  );
};

export default Header;






