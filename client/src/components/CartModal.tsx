// src/components/CartModal.tsx

import React from 'react';

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-3/4">
        <button onClick={onClose} className="float-right text-xl font-bold">&times;</button>
        <h2 className="text-2xl mb-4">Shopping Cart</h2>
        {/* Shopping Cart Content Here */}
        <div className="text-right">
          <button onClick={onClose} className="bg-blue-500 text-white py-2 px-4 rounded">Close</button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
