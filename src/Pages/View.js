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

  useEffect(() => {
    const checkCart = async () => {
      const snapshot = await getDocs(collection(db, 'cart'));
      const items = snapshot.docs.map(doc => doc.data());
      const found = items.some(item => item.id === itemdata.id);
      setIsInCart(found);
    };
    checkCart();
  }, [itemdata.id]);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!isInCart) {
      const productWithQuantity = { ...itemdata, quantity };
      await addDoc(collection(db, 'cart'), productWithQuantity);
      setIsInCart(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-blue-100 flex justify-center items-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
        
        {/* Left - Image */}
        <div className="md:w-1/2 w-full h-72 md:h-auto">
          <img
            src={itemdata.image}
            alt={itemdata.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right - Info */}
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{itemdata.name}</h2>
            <p className="text-gray-600 mb-4">
              Premium quality. Carefully selected for your lifestyle. Add your full product details here.
            </p>
            <p className="text-md text-gray-500 mb-2">Price per Unit: ₹{priceValue.toFixed(2)}</p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={decrement}
                className="text-2xl font-bold bg-gray-200 px-3 rounded hover:bg-gray-300"
              >
                −
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                onClick={increment}
                className="text-2xl font-bold bg-gray-200 px-3 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Total Price */}
            <p className="text-xl text-blue-700 font-semibold mb-6">
              Total: ₹{totalPrice}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`mt-4 py-2 px-6 rounded font-semibold transition-all duration-300 ${
              isInCart
                ? 'bg-blue-600 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isInCart ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;
