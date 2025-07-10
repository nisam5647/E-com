import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import { db, collection, onSnapshot } from '../firebase';

const name = "<cArT/>";

function Header() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'wishlist'), (snapshot) => {
      const items = snapshot.docs.map(doc => doc.data());
      const uniqueIds = new Set(items.map(item => item.id));
      setWishlistCount(uniqueIds.size);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-gradient-to-r from-blue-700 via-indigo-900 to-red-800 text-white shadow-md px-4 py-8 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-4xl font-bold">{name}</div>

        {/* Hamburger menu icon (mobile only) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none text-white">
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex gap-6 text-lg items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/Products" className="hover:underline">Products</Link>
          <Link to="/About" className="hover:underline">About</Link>
          <Link to="/Contact" className="hover:underline">Contact</Link>
          <Link to="/Cart" className="hover:underline flex items-center gap-1">
            <FaShoppingCart /> Cart
          </Link>
          <div className="relative">
            <Link to="/wishlist" className="hover:underline flex items-center gap-1">
              <FaHeart /> Wishlist
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 px-2">
          <div className="flex flex-col gap-3 bg-white text-gray-800 rounded-lg shadow-md p-4">
            <Link to="/" className="hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/Products" className="hover:underline" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/About" className="hover:underline" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/Contact" className="hover:underline" onClick={() => setMenuOpen(false)}>Contact</Link>
            <Link to="/Cart" className="hover:underline flex items-center gap-1" onClick={() => setMenuOpen(false)}>
              <FaShoppingCart /> Cart
            </Link>
            <Link to="/wishlist" className="hover:underline flex items-center gap-1" onClick={() => setMenuOpen(false)}>
              <FaHeart /> Wishlist
              {wishlistCount > 0 && (
                <span className="ml-1 bg-pink-500 text-white text-xs rounded-full px-2">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/Tickets" className="hover:underline" onClick={() => setMenuOpen(false)}>Tickets</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
