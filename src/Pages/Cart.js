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
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          🛒 Your Cart
        </h2>

        {cartProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <div className="md:flex gap-6">
            {/* Cart Items Section */}
            <div className="flex-1 bg-white p-4 rounded-lg shadow-md max-h-[500px] overflow-y-auto">
              {/* Header row */}
              <div className="grid grid-cols-6 gap-4 px-2 py-2 font-semibold text-gray-700 border-b border-gray-300 sticky top-0 bg-white z-10">
                <span>Product</span>
                <span className="col-span-2">Name</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>

              {/* Items */}
              <div className="space-y-4 mt-2">
                {cartProducts.map((item, index) => (
                  <div
                    key={item.firestoreId}
                    className="grid grid-cols-6 gap-4 items-center px-2 py-3 border-b"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span className="col-span-2 text-gray-800">{item.name}</span>
                    <span className="text-green-700 font-medium">₹{parsePrice(item.price)}</span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(index, -1)}
                        className="p-1 bg-gray-200 rounded"
                      >
                        <FaMinus />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(index, 1)}
                        className="p-1 bg-gray-200 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        ₹{(item.quantity * parsePrice(item.price)).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemove(item.firestoreId)}
                        className="text-sm text-red-500 hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Section */}
            <div className="w-full md:w-80 bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>

                {/* Subtotal */}
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Subtotal</span>
                  <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                {/* Promo Code */}
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

              {/* Grand Total and Checkout */}
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
