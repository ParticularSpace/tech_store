import React, { useState } from "react";
import SignInModal from "./SignInModal";
import Register from "./Register";
import CartModal from "./CartModal";
import SearchBar from "./SearchBar";

// The Header component for the application
const Header = () => {
  // State variables for controlling modal visibility
  const [signInIsOpen, setSignInIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Logout function to remove user and token data
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    window.location.reload();
  };

  // Functions to open and close SignInModal
  const openSignIn = () => setSignInIsOpen(true);
  const closeSignIn = () => setSignInIsOpen(false);

  // Handle user registration flow
  const handleRegister = () => {
    closeSignIn();
    setIsRegistering(true);
  };

  // Close the registration modal
  const closeRegister = () => {
    setIsRegistering(false);
  };

  // Functions to open and close CartModal
  const openCart = () => setCartIsOpen(true);
  const closeCart = () => setCartIsOpen(false);

  // Type definition for cart items
  type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };

  // Sample cart items
  const cartItems: CartItem[] = [
    {
      id: "1",
      title: "Gadget A",
      price: 100,
      quantity: 2,
      imageUrl: "https://via.placeholder.com/150x100",
    },
  ];

  // Function to toggle the menu
  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  return (
    // Main header section
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Combine Logo, title, and SearchBar in a single flex container */}
        <div className="flex items-center space-x-4"> 
          <a href="/" className="mr-4">
            <img
              src="../assets/images/logo.png"
              alt="Gadget Logo"
              className="w-10 h-10"
            />
          </a>
          <h1 className="text-2xl font-bold">Gadget</h1>
  
          {/* Moved SearchBar here */}
          <nav className="hidden md:flex space-x-4">
            <SearchBar />
          </nav>
        </div>
  
        <div className="flex items-center relative space-x-4">
          {user.firstName && <span className="mr-4 text-xl">Hi {user.firstName}!</span>}
          {user.firstName ? (
            <>
              <button onClick={toggleMenu} className="bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded">
                &#9776;
              </button>
              {menuIsOpen && (
                <div className="absolute bg-white text-black right-0 top-full mt-2 w-48 rounded-lg shadow-lg z-50">
                  <a href="/profile" className="block p-2 hover:bg-gray-200">Profile</a>
                  <a href="/orders" className="block p-2 hover:bg-gray-200">Orders</a>
                  <a href="/settings" className="block p-2 hover:bg-gray-200">Settings</a>
                  <a href="#" className="block p-2 hover:bg-gray-200" onClick={logout}>Logout</a>
                </div>
              )}
            </>
          ) : (
            <button onClick={openSignIn} className="bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded">
              Sign In
            </button>
          )}
          <a href="#" className="hover:underline ml-4" onClick={openCart}>
            Cart (0)
          </a>
        </div>
      </div>
  
      {signInIsOpen && !isRegistering && (
        <SignInModal
          isOpen={signInIsOpen}
          onClose={closeSignIn}
          onRegister={handleRegister}
        />
      )}
      {isRegistering && <Register onClose={closeRegister} />}
      {cartIsOpen && (
        <CartModal isOpen={cartIsOpen} onClose={closeCart} items={cartItems} />
      )}
    </header>
  );
  
};

export default Header;
