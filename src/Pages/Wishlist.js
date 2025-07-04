import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../Redux/Reducer/WishlistSlice';

function Wishlist() {
  const wishlistItems = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">💖 Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        wishlistItems.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-white p-4 mb-4 rounded shadow">
            <div className="flex gap-4 items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.price}</p>
              </div>
            </div>
            <button
              onClick={() => dispatch(removeFromWishlist(item.id))}
              className="text-red-600 hover:text-red-800"
            >
              ❌ Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
