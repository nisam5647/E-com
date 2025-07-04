import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db, collection, addDoc, getDocs } from '../firebase';

const View = () => {
  const location = useLocation();
  const { itemdata } = location.state;

  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const priceValue = parseFloat(itemdata.price.replace(/[^0-9.]/g, '')) || 0;
  const totalPrice = (priceValue * quantity).toFixed(2);

  // 🔍 Check if item is already in Firebase cart
  useEffect(() => {
    const checkCart = async () => {
      const snapshot = await getDocs(collection(db, 'cart'));
      const items = snapshot.docs.map(doc => doc.data());
      const found = items.some(item => item.id === itemdata.id);
      setIsInCart(found);
    };
    checkCart();
  }, [itemdata.id]);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!isInCart) {
      const productWithQuantity = { ...itemdata, quantity };
      await addDoc(collection(db, 'cart'), productWithQuantity);
      setIsInCart(true); // update button state immediately
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
        {/* Left: Product Image */}
        <div className="md:w-1/2 w-full">
          <img src={itemdata.image} alt={itemdata.name} className="w-full h-full object-cover" />
        </div>

        {/* Right: Product Details */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{itemdata.name}</h2>
            <p className="text-gray-600 mb-4">
              This is a high-quality product carefully selected for you. You can add a more detailed description here later.
            </p>
            <p className="text-md text-gray-500 mb-2">Unit Price: ₹ {priceValue.toFixed(2)}</p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={decrement}
                className="text-xl bg-gray-200 px-3 rounded hover:bg-gray-300"
              >
                −
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={increment}
                className="text-xl bg-gray-200 px-3 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <p className="text-xl text-blue-600 font-semibold mb-6">Total: ₹ {totalPrice}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`py-2 px-4 rounded w-max self-start transition ${
              isInCart
                ? "bg-blue-600 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isInCart ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
