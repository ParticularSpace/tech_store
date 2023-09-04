import React, { useEffect, useState, useRef } from "react";
import { useLazyQuery } from '@apollo/client';
import SignInModal from "./SignInModal";
import Register from "./Register";
import CartModal from "./CartModal";
import SearchBar from "./SearchBar";
import { GET_USER_CART } from '../gql/queries';

const Header = () => {
  const [signInIsOpen, setSignInIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  
  // Local state to manage cart for guests
  const [localCart, setLocalCart] = useState([]);

  // Apollo lazy query to fetch user cart
  const [loadUserCart, { loading, error, data }] = useLazyQuery(GET_USER_CART);

  // Load user from local storage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const auth_token = localStorage.getItem("auth_token");

  

  console.log('User:', user);

  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      if (user && auth_token) {
        console.log('Triggering loadUserCart because user is logged in');
        loadUserCart();
      } else {
        console.log('Loading cart from local storage because user is not logged in');
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setLocalCart(storedCart);
      }
      initialLoad.current = false;
    }
  }, [user, loadUserCart]);
  

  // Update local storage when local cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(localCart));
  }, [localCart]);

  const userCart = data?.getUserCart?.items || [];

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth_token");
    window.location.reload();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="relative bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="/" className="mr-4">
            <img src="../assets/images/logo.png" alt="Tech Logo" className="w-10 h-10" />
          </a>
          <h1 className="text-2xl text-white font-bold">Tech Store</h1>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar />
          {user?.firstName ? (
            <>
              <span className="text-white text-xl">Hi, {user.firstName}</span>
              <button className="bg-blue-800 text-white p-2 rounded" onClick={logout}>Logout</button>
            </>
          ) : (
            <button className="bg-blue-800 text-white p-2 rounded" onClick={() => setSignInIsOpen(true)}>Sign In</button>
          )}
          <button className="bg-blue-800 text-white p-2 rounded" onClick={() => setCartIsOpen(true)}>Cart ({user?.firstName ? userCart.length : localCart.length})</button>
        </div>
      </div>
      <SignInModal isOpen={signInIsOpen} onClose={() => setSignInIsOpen(false)} onRegister={() => setIsRegistering(true)} />
      {isRegistering && <Register onClose={() => setIsRegistering(false)} />}
      <CartModal isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)} items={user?.firstName ? userCart : localCart} />
    </div>
  );
};

export default Header;
