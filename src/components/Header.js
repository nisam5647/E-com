import React from 'react';
import { Link } from 'react-router-dom';

const name = "<cArT/>";

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-indigo-900 to-red-800 text-white shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo */}
        <div className="text-3xl md:text-5xl font-bold text-center md:text-left">
          {name}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-10 text-lg">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/Products" className="hover:underline">Products</Link>
          <Link to="/About" className="hover:underline">About</Link>
          <Link to="/Contact" className="hover:underline">Contact</Link>
          <Link to="/Cart" className="hover:underline">🛒Cart</Link>
          <Link to="/Tickets" className="hover:underline">Tickets</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
