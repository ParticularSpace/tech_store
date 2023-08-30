import React, { useState } from "react";
import SignInModal from "./SignInModal";
import Register from "./Register";
import CartModal from "./CartModal";
import SearchBar from "./SearchBar";

const Header = () => {
  const [signInIsOpen, setSignInIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const openSignIn = () => setSignInIsOpen(true);
  const closeSignIn = () => setSignInIsOpen(false);

  const handleRegister = () => {
    closeSignIn();
    setIsRegistering(true);
  };

  const closeRegister = () => {
    setIsRegistering(false);
  };

  const openCart = () => setCartIsOpen(true);
  const closeCart = () => setCartIsOpen(false);

  type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
  };

  const cartItems: CartItem[] = [
    {
      id: "1",
      title: "Gadget A",
      price: 100,
      quantity: 2,
      imageUrl: "https://via.placeholder.com/150x100",
    },
  ];

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

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
        <SearchBar />  
        </nav>

        <div className="flex items-center relative space-x-4"> {/* Add space between items */}
        {user.firstName && <span className="mr-4 text-xl">Hi {user.firstName}!</span>} {/* Increase margin right */}
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
        <a href="#" className="hover:underline ml-4" onClick={openCart}> {/* Increase margin left */}
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
