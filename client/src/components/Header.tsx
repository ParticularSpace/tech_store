import React, { useState } from 'react'; // Removed useContext
import SignInModal from './SignInModal';
import Register from './Register';
import CartModal from './CartModal';

const Header = () => {
  const [signInIsOpen, setSignInIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  // Retrieve the user object from localStorage or global state
  const user = JSON.parse(localStorage.getItem('user') || '{}');

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
      id: '1',
      title: 'Gadget A',
      price: 100,
      quantity: 2,
      imageUrl: 'https://via.placeholder.com/150x100',
    },
  ];

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="mr-4">
            <img src="../assets/images/logo.png" alt="Gadget Logo" className="w-10 h-10" />
          </a>
          <h1 className="text-2xl font-bold">Gadget</h1>
        </div>

        <nav className="hidden md:flex space-x-4">
          {/* ... */}
        </nav>

        <div className="flex items-center space-x-4">
          {user.firstName && <span className="mr-2 text-xl">Hi {user.firstName}!</span>}
          {user.firstName ? (
            <button className="bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded">
              {/* Hamburger icon for Menu */}
              &#9776;
            </button>
          ) : (
            <button onClick={openSignIn} className="bg-blue-800 hover:bg-blue-900 py-2 px-4 rounded">
              Sign In
            </button>
          )}
          <a href="#" className="hover:underline" onClick={openCart}>
            Cart (0)
          </a>
        </div>
      </div>
      {signInIsOpen && !isRegistering && <SignInModal isOpen={signInIsOpen} onClose={closeSignIn} onRegister={handleRegister} />}
      {isRegistering && <Register onClose={closeRegister} />}
      {cartIsOpen && <CartModal isOpen={cartIsOpen} onClose={closeCart} items={cartItems} />}
    </header>
  );
};

export default Header;
