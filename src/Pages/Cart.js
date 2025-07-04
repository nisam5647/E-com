import React, { useEffect, useState } from 'react';
import { db, collection, getDocs, deleteDoc, doc } from '../firebase';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  const fetchCart = async () => {
    const snapshot = await getDocs(collection(db, 'cart'));
    // Note: We store Firestore doc ID as firestoreId for deletion
    const items = snapshot.docs.map(docSnap => ({
      firestoreId: docSnap.id,
      ...docSnap.data()
    }));
    setCartProducts(items);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (firestoreId) => {
    try {
      await deleteDoc(doc(db, 'cart', firestoreId));
      setCartProducts(prev => prev.filter(item => item.firestoreId !== firestoreId));
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">🛒 Your Cart</h2>

      {cartProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartProducts.map((item) => (
            <div
              key={item.firestoreId}
              className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-lg text-green-600 font-medium">{item.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.firestoreId)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
