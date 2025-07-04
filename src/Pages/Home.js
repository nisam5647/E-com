import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 text-gray-800 flex flex-col items-center justify-center px-4 md:px-6 py-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-center leading-tight">
        Welcome to <span className="text-blue-600">E-Com Store</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-2xl mb-8">
        Discover trending products, exclusive offers, and seamless shopping experiences made just for you.
      </p>
      <Link to="/Products">
        <button className="bg-gradient-to-r from-blue-700 via-indigo-900 to-red-800 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transform transition duration-300">
          🛍️ Shop Now
        </button>
      </Link>
    </div>
  );
}

export default Home;
