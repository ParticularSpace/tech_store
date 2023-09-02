import React, { useState } from "react";
import SignInModal from "./SignInModal";
import Register from "./Register";
import CartModal from "./CartModal";
import SearchBar from "./SearchBar";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

const sampleCartItems: CartItem[] = [
  {
    id: "1",
    title: "Sample Item 1",
    price: 100,
    quantity: 1,
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "Sample Item 2",
    price: 200,
    quantity: 2,
    imageUrl: "https://via.placeholder.com/150",
  },
];

const Header = () => {
  const [signInIsOpen, setSignInIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    window.location.reload();
  };

  const openSignIn = () => setSignInIsOpen(true);
  const closeSignIn = () => setSignInIsOpen(false);

  const handleRegister = () => {
    closeSignIn();
    setIsRegistering(true);
  };

  const handleSignInFromRegister = () => {
    closeRegister();
    openSignIn();
  };

  const closeRegister = () => {
    setIsRegistering(false);
  };

  const openCart = () => setCartIsOpen(true);
  const closeCart = () => setCartIsOpen(false);

  return (
    <div className="relative z-50">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="/" className="mr-4">
              <img
                src="../assets/images/logo.png"
                alt="Gadget Logo"
                className="w-10 h-10"
              />
            </a>
            <h1 className="text-2xl font-bold">Gadget</h1>
            <nav className="hidden md:flex space-x-4">
              <SearchBar />
            </nav>
          </div>
          <div className="flex items-center relative space-x-4">
            {user.firstName && (
              <span className="mr-4 text-xl">Hi {user.firstName}!</span>
            )}
            {user.firstName ? (
              <>
                <button
                  onClick={() => setMenuIsOpen(!menuIsOpen)}
                  className="bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded"
                >
                  &#9776;
                </button>
                {menuIsOpen && (
                  <div className="absolute bg-white text-black left-0 top-full mt-2 w-48 rounded-lg shadow-lg z-999">
                    <a href="/orders" className="block p-2 hover:bg-gray-200">
                      Orders
                    </a>
                    <a href="/settings" className="block p-2 hover:bg-gray-200">
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block p-2 hover:bg-gray-200"
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={openSignIn}
                className="bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded"
              >
                Sign In
              </button>
            )}
            <a href="#" className="hover:underline ml-4" onClick={openCart}>
              Cart (0)
            </a>
          </div>
        </div>
      </header>
      {signInIsOpen && !isRegistering && (
         <div className="absolute right-6 bg-white border rounded-lg w-64 z-999">
          <SignInModal
            isOpen={signInIsOpen}
            onClose={closeSignIn}
            onRegister={handleRegister}
          />
        </div>
      )}
      {isRegistering && (
        <div className="absolute right-6 bg-white border rounded-lg w-64 z-999">
          <Register onClose={closeRegister} openSignIn={handleSignInFromRegister} />
        </div>
      )}
      {cartIsOpen && (
        <CartModal
          isOpen={cartIsOpen}
          onClose={closeCart}
          items={sampleCartItems}
        />
      )}
    </div>
  );
};

export default Header;






