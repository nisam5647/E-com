import React, { useEffect, useState } from 'react';
import { db, collection, deleteDoc, doc, onSnapshot } from '../firebase';
import { toast } from 'react-toastify';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'wishlist'), async (snapshot) => {
      const uniqueMap = new Map();
      const duplicates = [];

      snapshot.docs.forEach(docSnap => {
        const data = { firestoreId: docSnap.id, ...docSnap.data() };

        // Prevent duplicate entries by checking 'id'
        if (uniqueMap.has(data.id)) {
          duplicates.push(docSnap.id); // Mark duplicate for deletion
        } else {
          uniqueMap.set(data.id, data);
        }
      });

      // Automatically remove duplicates from Firestore
      for (const id of duplicates) {
        await deleteDoc(doc(db, 'wishlist', id));
      }

      setWishlistItems(Array.from(uniqueMap.values()));
    });

    return () => unsubscribe();
  }, []);

  const handleRemove = async (firestoreId) => {
    try {
      await deleteDoc(doc(db, 'wishlist', firestoreId));
      toast.info('Removed from wishlist');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-pink-100 px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-pink-700 mb-10">💖 Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {wishlistItems.map((item) => (
            <div
              key={item.firestoreId}
              className="bg-white rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between p-4 gap-4 transition"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-lg text-pink-600 font-medium">{item.price}</p>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.firestoreId)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
