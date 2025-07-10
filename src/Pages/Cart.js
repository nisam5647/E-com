import React, { useEffect, useState } from 'react';
import { db, collection, getDocs, deleteDoc, doc, updateDoc } from '../firebase';
import { FaPlus, FaMinus } from 'react-icons/fa';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const snapshot = await getDocs(collection(db, 'cart'));
    const items = snapshot.docs.map(docSnap => ({
      firestoreId: docSnap.id,
      quantity: docSnap.data().quantity || 1,
      ...docSnap.data()
    }));
    setCartProducts(items);
  };

  const handleRemove = async (firestoreId) => {
    try {
      await deleteDoc(doc(db, 'cart', firestoreId));
      setCartProducts(prev => prev.filter(item => item.firestoreId !== firestoreId));
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const handleQuantityChange = async (index, delta) => {
    const updatedItems = [...cartProducts];
    const item = updatedItems[index];
    const newQuantity = Math.max(1, item.quantity + delta);
    updatedItems[index].quantity = newQuantity;

    try {
      const itemRef = doc(db, 'cart', item.firestoreId);
      await updateDoc(itemRef, { quantity: newQuantity });
      setCartProducts(updatedItems);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const parsePrice = (price) => parseFloat(price.replace(/[^0-9.]/g, '') || 0);
  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.quantity * parsePrice(item.price),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 px-2 py-6">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          🛒 Your Cart
        </h2>

        {cartProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 w-full">
            {/* Cart Table */}
            <div className="flex-1 bg-white p-2 sm:p-4 rounded-lg shadow-md max-h-[500px] overflow-y-auto w-full">
              {/* Table Header */}
              <div className="grid grid-cols-6 gap-2 sm:gap-4 px-1 sm:px-2 py-2 font-semibold text-xs sm:text-sm text-gray-700 border-b border-gray-300 sticky top-0 bg-white z-10">
                <span>Product</span>
                <span className="col-span-2">Name</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Total</span>
              </div>

              {/* Cart Items */}
              {cartProducts.map((item, index) => (
                <div
                  key={item.firestoreId}
                  className="grid grid-cols-6 gap-2 sm:gap-4 px-1 sm:px-2 py-2 border-b text-xs sm:text-sm items-center"
                >
                  {/* Product Image */}
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 sm:w-16 sm:h-16 object-cover rounded"
                    />
                  </div>

                  {/* Name */}
                  <div className="col-span-2 text-gray-800 break-words">{item.name}</div>

                  {/* Price */}
                  <div className="text-green-700 font-medium whitespace-nowrap">
                    ₹{parsePrice(item.price)}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex justify-center items-center gap-1">
                    <button
                      onClick={() => handleQuantityChange(index, -1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(index, 1)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  {/* Total + Remove */}
                  <div className="flex flex-col items-end sm:items-start text-green-600 font-bold">
                    <span>₹{(item.quantity * parsePrice(item.price)).toFixed(2)}</span>
                    <button
                      onClick={() => handleRemove(item.firestoreId)}
                      className="text-[11px] text-red-500 hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="w-full md:w-80 bg-white p-4 rounded-lg shadow-md flex flex-col justify-between text-sm sm:text-base">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>

                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="my-4">
                  <label htmlFor="promo" className="block text-gray-700 font-medium mb-1">
                    Promo Code
                  </label>
                  <input
                    id="promo"
                    type="text"
                    placeholder="Enter code"
                    className="w-full border rounded px-3 py-2 text-gray-700"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mt-4 pt-4 border-t">
                  <span className="text-lg font-semibold text-gray-800">Grand Total</span>
                  <span className="text-lg font-bold text-gray-800">₹{subtotal.toFixed(2)}</span>
                </div>

                <button
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                  onClick={() => alert('Checkout button clicked')}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
