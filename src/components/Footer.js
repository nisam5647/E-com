import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-indigo-900 to-red-800 text-white shadow-md flex flex-row justify-evenly items-center py-6 px-4">
      
      <div className="ml-32 text-3xl font-bold">E-Com Store</div>

      <div className="mr-16 text-lg">
        © {new Date().getFullYear()} E-Com Store. All rights reserved.
      </div>
      
    </footer>
  );
}

export default Footer;
