import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM_FROM_CART } from '../gql/mutations';

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imgUrl: string;
};

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, items }) => {
  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);

  const handleRemoveFromCart = async (productId: string) => {

    console.log("productId: ", productId);

    await removeItemFromCart({ variables: { productId } });
    // Trigger a reload or refresh of the cart here if needed
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // need to console log items to check on id
  console.log("items: ", items);

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        <span className="cursor-pointer text-black float-right" onClick={onClose}>
          &times;
        </span>
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {
          items.map((item) => (
            <div key={item.productId} className="flex justify-between items-center mb-3">
              <img src={item.imgUrl} alt={item.name} className="w-16 h-16" />
              <div className="flex-1 ml-4">
                <h2 className="text-lg">{item.name}</h2>
                <p>{item.quantity} x ${item.price.toFixed(2)}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button> 
 {/* Remove button */}
              <p className="text-xl font-bold">
                ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          ))
        }
        <hr className="my-4" />
        <div className="flex justify-between">
          <h2 className="text-xl text-black font-bold">Total</h2>
          <p className="text-xl text-black font-bold">
            ${totalAmount.toFixed(2)}
          </p>
        </div>
        <Link to="/checkout" className="bg-blue-500 text-white p-2 rounded-lg w-full block text-center mt-4" onClick={onClose}>
          Proceed to Checkout
        </Link>
      </div>
    </div>
  ) : null;
};

export default CartModal;
