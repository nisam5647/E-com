import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

function ProductCard({ product, onAddToCart, cartItems }) {
  const { id, name, price, image } = product;

  const cartItem = cartItems.find(item => item.id === id);
  const quantity = cartItem?.quantity || 0;

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
            e.stopPropagation(); // Prevent navigating on icon click
            onAddToCart(product);
          }}
          className="relative w-full py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded flex items-center justify-center gap-2"
        >
          <FaShoppingCart className="text-lg" />
          {quantity > 0 ? `x${quantity}` : "Add"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
