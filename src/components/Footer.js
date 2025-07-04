import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-indigo-900 to-red-800 text-white shadow-md flex flex-col md:flex-row justify-between items-center py-6 px-6 gap-4">
      
      <div className="text-2xl md:text-3xl font-bold text-center md:text-left">
        E-Com Store
      </div>

      <div className="text-sm md:text-lg text-center md:text-right">
        © {new Date().getFullYear()} E-Com Store. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
