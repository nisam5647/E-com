import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, onAddToCart }) {
  const { id, name, price, image } = product;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden transition cursor-pointer">
      <Link to="/view" state={{ itemdata: product }}>
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-blue-600 font-medium mt-1">{price}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent Link from triggering
            onAddToCart(product);
          }}
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
