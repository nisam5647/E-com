import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { db, collection, onSnapshot } from '../firebase';

const name = "<cArT/>";

function Header() {
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'wishlist'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data());
      const uniqueIds = new Set(items.map(item => item.id));
      setWishlistCount(uniqueIds.size);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-700 via-indigo-900 to-red-800 text-white shadow-md px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="text-3xl md:text-5xl font-bold text-center md:text-left">
          {name}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-10 text-lg items-center relative">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/Products" className="hover:underline">Products</Link>
          <Link to="/About" className="hover:underline">About</Link>
          <Link to="/Contact" className="hover:underline">Contact</Link>

          <Link to="/Cart" className="hover:underline flex items-center gap-1">
            <FaShoppingCart />
            Cart
          </Link>

          {/* Wishlist with real-time badge */}
          <div className="relative">
            <Link to="/wishlist" className="hover:underline flex items-center gap-1">
              <FaHeart />
              Wishlist
            </Link>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2">
                {wishlistCount}
              </span>
            )}
          </div>

          <Link to="/Tickets" className="hover:underline">Tickets</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
